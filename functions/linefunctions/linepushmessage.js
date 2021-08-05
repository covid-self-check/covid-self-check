const { convertTimestampToStr } = require("../utils/date");
const axios = require("axios");
const baseURL = "https://api.line.me/v2/bot/message/push";
const { statusListReversem, statusList } = require("../api/api");


const symptomMapper = {
    sym1_severe_cough: "มีอาการไอต่อเนื่อง",
    sym1_chest_tightness: "มีอาการแน่นหน้าอก หายใจไม่สะดวก",
    sym1_poor_appetite: "เบื่ออาหาร",
    sym1_fatigue: "อ่อนเพลียมาก",
    sym1_persistent_fever: "มีไข้สูงลอย",
    sym2_tired_body_ache: 'มีอาการอ่อนเพลีย ปวดเมื้อยตามตัว',
    sym2_cough: 'มีอาการไอรุนแรง',
    sym2_fever: 'มีไข้ขึ้น',
    sym2_liquid_stool: 'ท้องเสีย',
    sym2_cannot_smell: 'จมูกไม่รับกลิ่น',
    sym2_rash: 'มีผื่นขึ้นตามตัว',
    sym2_red_eye: 'ตาแดง',
}

const conditionMapper = {
    fac_bed_ridden_status: "ติดเตียง",
    fac_uri_symptoms: "มีอาการทางเดินหายใจส่วนบน เช่น ไอ น้ำมูก คัดจมูก",
    fac_olfactory_symptoms: "ได้กลิ่นแย่ลง/ไม่ได้กลิ่น",
    fac_diarrhea: "ท้องเสียถ่ายเหลว",
    fac_dyspnea: 'มีอาการอ่อนเพลีย ปวดเมื้อยตามตัว',
    fac_chest_discomfort: 'หอบเหนื่อย หายใจเร็ว/ลำบาก',
    fac_gi_symptoms: 'แน่นหน้าอก',
}

const getPatientCondition = (statusObj, mapper) => {
    conditions = []
    for (let key in statusObj) {
        if (statusObj[key] === 1 && key in mapper) {
            conditions.push(mapper[key])
        }
    }
    return conditions.join(', ')
}

exports.statusMap = {
    "G1": "เขียวอ่อน",
    "G2": "เขียวเข้ม",
    "Y1": "เหลืองอ่อน",
    "Y2": "เหลืองเข้ม",
    "R1": "แดงอ่อน",
    "R2": "แดงเข้ม",
    "unknown": "ไม่สามารถระบุได้"
}

const statusNumberMap = {
    1: "เขียวอ่อน",
    2: "เขียวเข้ม",
    3: "เหลืองอ่อน",
    4: "เหลืองเข้ม",
    5: "แดงอ่อน",
    6: "แดงเข้ม",
    0: "ไม่สามารถระบุได้"
}

const getPatientTextColor = (statusNumber) => {
    return statusNumberMap[statusNumber]
}


const sendPatientstatus = async (userId, statusObj, channelAccessToken) => {
    const date = convertTimestampToStr({ dateObj: statusObj.lastUpdatedAt })
    let message = `วันที่: ${date.dateObj} 
    \nข้อมูลทั่วไป:
    - ค่าออกซิเจนปลายนิ้ว: ${statusObj.sp_o2 || '-'}  
    - ค่าออกซิเจนปลายนิ้ว ขณะหายใจปกติ: ${statusObj.sp_o2_ra || '-'}
    - ค่าออกซิเจนปลายนิ้ว หลังลุกนั่ง 1 นาที: ${statusObj.sp_o2_after_eih || '-'}`
    const patientCondition = getPatientCondition(statusObj, conditionMapper)
    const patientsymptom = getPatientCondition(statusObj, symptomMapper)
    let symptom = `\n\nอาการที่พบ: ${patientsymptom === '' ? '-' : patientsymptom}`
    let condition = `\n\nอัปเดตโรคประจำตัว: ${patientCondition === '' ? '-' : patientCondition}`
    patientColor = getPatientTextColor(statusObj.status);
    let conclude = `\n\nผลลัพธ์:
    - ระดับ: ${patientColor}
    - ระดับอาการป่วย (เต็ม 100): ${statusObj.triage_score !== undefined ? statusObj.triage_score : '-'}`
    const messagePayload =
        [
            {
                "type": "text",
                "text": message + symptom + condition + conclude
            },
            {
                "type": "text",
                "text": "คุณได้ถูกย้ายไปให้หมอดูแลแล้ว"
            },
            {
                "type": "text",
                "text": "Message3 ของข้อความสีแดง"
            }
        ]
    let resultMessagePayload = [];
    switch (statusObj.status) {
        case statusList["G1"]:
        case statusList["G2"]:
            resultMessagePayload = messagePayload.slice(0, 1)
            break;
        case statusList["Y1"]:
        case statusList["Y2"]:
            resultMessagePayload = messagePayload.slice(0, 2)
            break;
        case statusList["R2"]:
        case statusList["R3"]:
            resultMessagePayload = messagePayload.slice(0, 3)
            break;
        default:
            resultMessagePayload = messagePayload.slice(0, 1)
    }
    const axiosConfig = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + channelAccessToken
        },
        data: {
            "to": userId,
            "messages": resultMessagePayload
        },
        baseURL
    }
    await axios(axiosConfig)
    console.log("message:", message)
}

module.exports = { sendPatientstatus };