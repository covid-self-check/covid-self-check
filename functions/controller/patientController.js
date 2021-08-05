const functions = require('firebase-functions')
const { registerSchema, getProfileSchema, historySchema } = require('../schema')
const { admin } = require('../init')
const { getProfile } = require('../middleware/authentication')
const { convertTZ } = require('../utils')
const { success } = require('../response/success')
const { makeStatusAPIPayload, makeRequest, statusList, statusListReverse } = require('../api/api')
const { sendPatientstatus } = require('../linefunctions/linepushmessage')
const { notifyToLine } = require('../linenotify')
const { convertTimestampToStr } = require('../utils/date')
const { config } = require('../config/index')

const addTotalPatientCount = async () => {
  const snapshot = await admin
    .firestore()
    .collection('userCount')
    .doc('users')
    .get()
  await snapshot.ref.update('count', admin.firestore.FieldValue.increment(1))
}

const decrementTotalPatientCount = async () => {
  const snapshot = await admin
    .firestore()
    .collection('userCount')
    .doc('users')
    .get()
  await snapshot.ref.update('count', admin.firestore.FieldValue.increment(-1))
}

const addTotalPatientCountByColor = async (status) => {
  const snapshot = await admin
    .firestore()
    .collection('userCount')
    .doc(status)
    .get()

  await snapshot.ref.update('count', admin.firestore.FieldValue.increment(1))
}

const decrementTotalPatientCountByColor = async (status) => {
  const snapshot = await admin
    .firestore()
    .collection('userCount')
    .doc(status)
    .get()

  await snapshot.ref.update('count', admin.firestore.FieldValue.increment(-1))
}

exports.registerPatient = async (data, _context) => {
  const { value, error } = registerSchema.validate(data)

  if (error) {
    console.log(error.details)
    throw new functions.https.HttpsError(
      'invalid-argument',
      'ข้อมูลไม่ถูกต้อง',
      error.details
    )
  }

  const { lineUserID, lineIDToken, noAuth, ...obj } = value
  const { error: authError } = await getProfile({
    lineUserID,
    lineIDToken,
    noAuth,
  })
  if (authError) {
    throw new functions.https.HttpsError(
      'unauthenticated',
      'ไม่ได้รับอนุญาต'
    )
  }

  const needFollowUp = true
  obj['status'] = 0
  obj['needFollowUp'] = needFollowUp
  obj['followUp'] = []
  const createdDate = convertTZ(new Date(), 'Asia/Bangkok')
  const createdTimestamp = admin.firestore.Timestamp.fromDate(createdDate)
  obj['createdDate'] = createdTimestamp
  obj['lastUpdatedAt'] = createdTimestamp
  obj['isRequestToCallExported'] = false
  obj['isRequestToCall'] = false
  obj['isNurseExported'] = false
  obj['toAmed'] = 0

  const snapshot = await admin
    .firestore()
    .collection('patient')
    .doc(lineUserID)
    .get()

  if (snapshot.exists) {
    if (snapshot.data().toAmed === 1) {
      throw new functions.https.HttpsError(
        'failed-precondition',
        'your information is already handle by Amed'
      )
    }
    throw new functions.https.HttpsError(
      'already-exists',
      'มีข้อมูลผู้ใช้ในระบบแล้ว'
    )
  }

  await snapshot.ref.create(obj)
  try {
    await addTotalPatientCount()
  } catch (err) {
    console.log(err)
  }

  return success(`Registration with ID: ${lineUserID} added`)
}

exports.getProfile = async (data, _context) => {
  const { value, error } = getProfileSchema.validate(data)
  if (error) {
    console.log(error.details)
    throw new functions.https.HttpsError(
      'invalid-argument',
      'ข้อมูลไม่ถูกต้อง',
      error.details
    )
  }

  const { lineUserID, lineIDToken, noAuth } = value
  const { data: lineProfile, error: authError } = await getProfile({
    lineUserID,
    lineIDToken,
    noAuth,
  })
  if (authError) {
    throw new functions.https.HttpsError(
      'unauthenticated',
      lineProfile.error_description
    )
  }

  const snapshot = await admin
    .firestore()
    .collection('patient')
    .doc(value.lineUserID)
    .get()

  const { name, picture } = lineProfile
  if (snapshot.exists) {
    const { followUp, ...patientData } = snapshot.data()
    const serializeData = convertTimestampToStr(patientData)
    return { line: { name, picture }, patient: serializeData }
  } else {
    return { line: { name, picture }, patient: null }
  }
}

exports.updateSymptom = async (data, _context) => {
  const { value, error } = historySchema.validate(data)
  if (error) {
    // DEBUG
    console.log(error.details)
    throw new functions.https.HttpsError(
      'invalid-argument',
      'ข้อมูลไม่ถูกต้อง',
      error.details
    )
  }

  const { lineUserID, lineIDToken, noAuth, ...obj } = value
  const { error: authError, data: errorData } = await getProfile({
    lineUserID,
    lineIDToken,
    noAuth,
  })
  if (authError) {
    throw new functions.https.HttpsError(
      'unauthenticated',
      errorData.error_description
    )
  }

  const createdDate = convertTZ(new Date(), 'Asia/Bangkok')
  obj.createdDate = admin.firestore.Timestamp.fromDate(createdDate)

  const snapshot = await admin
    .firestore()
    .collection('patient')
    .doc(lineUserID)
    .get()
  if (!snapshot.exists) {
    throw new functions.https.HttpsError(
      'not-found',
      `ไม่พบผู้ใช้ ${lineUserID}`
    )
  }

  const snapshotData = snapshot.data()
  const {
    followUp,
    firstName,
    lastName,
    toAmed,
    status: previousStatus,
  } = snapshotData

  if (toAmed === 1) {
    throw new functions.https.HttpsError(
      'failed-precondition',
      'your information is already handle by Amed'
    )
  }
  //TO BE CHANGED: snapshot.data.apply().status = statusCheckAPIorSomething;
  //update lastUpdatedAt field on patient

  const formPayload = makeStatusAPIPayload(snapshotData, obj)
  const { inclusion_label, inclusion_label_type, triage_score } =
    await makeRequest(formPayload)

  const status = statusList[inclusion_label]
  obj['status'] = status
  obj['status_label_type'] = inclusion_label_type
  obj['triage_score'] = triage_score
  obj['lastUpdatedAt'] = admin.firestore.Timestamp.fromDate(createdDate)

  const followUpObj = { ...obj }

  obj['isNurseExported'] = false

  const ALERT_STATUS = [
    statusList['Y1'],
    statusList['Y2'],
    statusList['R1'],
    statusList['R2'],
  ]

  let needNotification = false
  if (status !== previousStatus && ALERT_STATUS.includes(status)) {
    obj['toAmed'] = 1
    needNotification = true
  } else {
    obj['toAmed'] = 0
  }

  if (!followUp) {
    await snapshot.ref.set({ ...obj, followUp: [followUpObj] })
  } else {
    await snapshot.ref.update({
      ...obj,
      followUp: admin.firestore.FieldValue.arrayUnion(followUpObj),
    })
  }

  if (needNotification) {
    await notifyToLine(
      `ผู้ป่วย: ${firstName} ${lastName} มีการเปลี่ยนแปลงอาการฉุกเฉิน`
    )
  }

  try {
    if (previousStatus !== null) {
      await decrementTotalPatientCountByColor(statusListReverse[previousStatus])
    }

    if (obj['toAmed'] === 1) {
      await decrementTotalPatientCount()
    }

    await addTotalPatientCountByColor(inclusion_label)
    await sendPatientstatus(
      lineUserID,
      inclusion_label,
      config.line.channelAccessToken
    )
  } catch (err) {
    console.log(err)
  }

  return success({ status: inclusion_label })
}
