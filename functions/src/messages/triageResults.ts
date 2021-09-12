import { Message } from "@line/bot-sdk/dist/types";

// start green

const greenDetailMessage: Message = {
  type: "text",
  text: "💚 จากการกรอกแบบประเมินอาการพบว่า คุณอาจไม่มีอาการจากโรคโควิด-19 หรือมีอยู่ในระดับต่ำ*\n-----------------\n💚 หากคุณยังไม่ได้รับการตรวจ คุณสามารถทำเเบบสอบถามประเมินความเสี่ยงได้จากเว็ปไซต์ของกรมอนามัย https://tinyurl.com/6pv3ucxs เเละเข้ารับการตรวจหากคุณมีประวัติเสี่ยงสูง\n💚 หากคุณได้รับการตรวจเเละพบเชื้อโควิด-19 แต่ยังไม่อยู่ในการดูเเลของเเพทย์ คุณอาจลงทะเบียนเข้าระบบการรักษาตัวที่บ้านสำหรับผู้ป่วยโควิด-19 ได้ โดยต้องทำการแยกกักตัวเป็นระยะเวลา 14 วัน เเละระวังการเเพร่กระจายเชื้อให้บุคคลในบ้าน นอกจากนั้น อย่าลืมเฝ้าระวังเเละประเมินอาการตนเองทุกวัน \n💚 หากคุณได้รับการตรวจเเละพบเชื้อโควิด-19 เเละอยู่ในการดูเเลของเเพทย์ โปรดปฏิบัติตามคำเเนะนำของเเพทย์ ระวังการเเพร่กระจายเชื้อให้บุคคลในบ้านเเละบุคคลอื่น\n⚠️ *หมายเหตุ: การประเมินด้วย “เพื่อนช่วยเช็ค” ใช้ระบบอัตโนมัติเพื่อให้คำเเนะนำเบื้องต้น ไม่สามารถใช้เป็นใบรับรองเเพทย์ได้",
};

const greenHiPrepImage: Message = {
  type: "image",
  originalContentUrl:
    "https://firebasestorage.googleapis.com/v0/b/comcovid-prod.appspot.com/o/TriageResults%2FGreen%2Fhi_prep.png?alt=media&token=b914ae39-fc3c-4f09-8918-dad35058fb67",
  previewImageUrl:
    "https://firebasestorage.googleapis.com/v0/b/comcovid-prod.appspot.com/o/TriageResults%2FGreen%2Fhi_prep.png?alt=media&token=b914ae39-fc3c-4f09-8918-dad35058fb67",
};

const greenMedicineImage: Message = {
  type: "image",
  originalContentUrl:
    "https://firebasestorage.googleapis.com/v0/b/comcovid-prod.appspot.com/o/TriageResults%2FGreen%2Fmedicine.jpg?alt=media&token=84e7fbcc-0bbe-4677-b6fb-2ba18133d8fa",
  previewImageUrl:
    "https://firebasestorage.googleapis.com/v0/b/comcovid-prod.appspot.com/o/TriageResults%2FGreen%2Fmedicine.jpg?alt=media&token=84e7fbcc-0bbe-4677-b6fb-2ba18133d8fa",
};

const greenHiGuidelineImage: Message = {
  type: "image",
  originalContentUrl:
    "https://firebasestorage.googleapis.com/v0/b/comcovid-prod.appspot.com/o/TriageResults%2FGreen%2Fhi_guideline.jpg?alt=media&token=61365a4d-5b89-411e-b28b-aff6b64124e9",
  previewImageUrl:
    "https://firebasestorage.googleapis.com/v0/b/comcovid-prod.appspot.com/o/TriageResults%2FGreen%2Fhi_guideline.jpg?alt=media&token=61365a4d-5b89-411e-b28b-aff6b64124e9",
};

const greenContactMessage: Message = {
  type: "text",
  text: '🙋🏻‍♀️ข้อปฏิบัติในกรณีลงทะเบียนรักษาตัวที่บ้าน (Home Isolation) แต่ไม่ได้รับการติดต่อจากคลินิกหรือโรงพยาบาล ควรทำอย่างไร ❓\nเรามีทางเลือกระบบดูแลผู้ป่วยที่รักษาตัวที่บ้านของหน่วยงานต่างๆมาแนะนำกัน\n1️⃣ หากมีบัตรทองสามารถลงทะเบียนได้ผ่านสายด่วน สปสช. 1330 กด 14 หากมีสิทธิ์ประกันสังคมโทร 1506 กด 6 กรณีต้องการกลับภูมิลำเนาเพื่อรักษาตัวโทร 1330 กด 15\n2️⃣ #เส้นด้าย ลงทะเบียนเข้าระบบการรักษาตัว Home Isolation ที่ https://cutt.ly/MQ6kMf1 หรือ แอดไลน์ zendai.official มีระบบคัดกรอง และช่วยเหลือด้านต่าง ๆ เพื่อให้ผู้ป่วยมีสิ่งจำเป็นในการรักษาตัวที่บ้านอย่างครบถ้วน\n3️⃣ ลงทะเบียนเข้าโครงการ "ตัวเล็ก ใจใหญ่" LINE@ : @lbhcovid19​ สำหรับผู้ป่วยโควิดทุกสี ทั้งคนไทยและต่างชาติที่อยู่ในพื้นที่กรุงเทพและปริมณฑล​ที่ยังไม่มีที่รักษา \n4️⃣ กรอกข้อมูลเพื่อลงทะเบียนรักษาตัวที่บ้านกับ สปสช. โทร 1330 หรือ https://crmsup.nhso.go.th/ หรือแอดไลน์ @nhso และกดลงทะเบียนในระบบดูแลที่บ้าน Home Isolation และรอเจ้าหน้าที่ยืนยันข้อมูล\n⏰ทั้งนี้ หากภายในช่วงเวลากักตัวมีอาการเปลี่ยนแปลงไปอย่างไร ทุกท่านยังสามารถกด\n“ประเมินอาการ” กับเราได้ตลอดเวลาเลย! ✌🏻',
};

const greenMessages = [
  greenDetailMessage,
  greenHiPrepImage,
  greenMedicineImage,
  greenHiGuidelineImage,
  greenContactMessage,
];

//end green

//start yellow

const yellowDetailMessage: Message = {
  type: "text",
  text: "💛 จากการกรอกแบบประเมินอาการพบว่า คุณอาจมีอาการจากโรคโควิด-19 อยู่พอสมควร*\n-----------------\n💛 หากคุณยังไม่ได้รับการตรวจ คุณอาจเข้าข่ายมีความเสี่ยงที่ควรไปตรวจหาเชื้อเพื่อเข้าระบบการรักษาต่อไป นอกจากนั้น อย่าลืมเฝ้าระวังเเละประเมินอาการตนเองทุกวัน \n💛 หากคุณได้รับการตรวจเเละพบเชื้อโควิด-19 แต่ยังไม่อยู่ในการดูเเลของเเพทย์ คุณสามารถติดต่อที่ช่องทางด้านล่าง เพื่อเข้าสู่ระดับการรักษาอย่างทันท่วงที\n💛 ระหว่างนี้ คุณสามารถกดปุ่ม “คำแนะนำตามอาการที่พบอาการที่พบบ่อย” เพื่อศึกษาวิธีการดูเเลตนเองเบื้องต้นได้\n💛 หากคุณได้รับการตรวจเเละพบเชื้อโควิด-19 เเละอยู่ในการดูเเลของเเพทย์ โปรดปฏิบัติตามคำเเนะนำของเเพทย์ เเละระวังการเเพร่กระจายเชื้อให้บุคคลในบ้าน\n⚠️*หมายเหตุ: การประเมินด้วย”เพื่อนช่วยเช็ค” ใช้ระบบอัตโนมัติเพื่อให้คำเเนะนำเบื้องต้น ไม่สามารถใช้เป็นใบรับรองเเพทย์ได้\n💊 โดยคุณอาจได้รับยาจากแพทย์ที่ดูเเลคุณ ดังนี้ 👇🏻",
};

const yellowFaviImage: Message = {
  type: "image",
  originalContentUrl:
    "https://firebasestorage.googleapis.com/v0/b/comcovid-prod.appspot.com/o/TriageResults%2FYellow%2Ffavi.jpg?alt=media&token=f5a8b99f-b0ea-49cf-902b-2e7fb73764d0",
  previewImageUrl:
    "https://firebasestorage.googleapis.com/v0/b/comcovid-prod.appspot.com/o/TriageResults%2FYellow%2Ffavi.jpg?alt=media&token=f5a8b99f-b0ea-49cf-902b-2e7fb73764d0",
};

const yellowContactImage: Message = {
  type: "image",
  originalContentUrl:
    "https://firebasestorage.googleapis.com/v0/b/comcovid-prod.appspot.com/o/TriageResults%2FYellow%2Fcontact.jpg?alt=media&token=0bf82b15-0a86-4d6f-b22a-039c37a388ef",
  previewImageUrl:
    "https://firebasestorage.googleapis.com/v0/b/comcovid-prod.appspot.com/o/TriageResults%2FYellow%2Fcontact.jpg?alt=media&token=0bf82b15-0a86-4d6f-b22a-039c37a388ef",
};

const yellowMessages = [
  yellowDetailMessage,
  yellowFaviImage,
  yellowContactImage,
];

//end yellow

//start red

const redDetailMessage: Message = {
  type: "text",
  text: "❤️ จากการกรอกแบบประเมินอาการพบว่า คุณอาจมีอาการจากโรคโควิด-19 ในระดับสูง ซึ่งควรอยู่ภายใต้การดูแลของแพทย์อย่างใกล้ชิด*\n---------------\n❤️ หากคุณยังไม่ได้รับการตรวจเชื้อโควิด-19 โปรดเข้ารับบริการทางการเเพทย์ เพื่อตรวจเชื้อเเละเข้าสู่กระบวนการรักษาอย่างทันท่วงที ‼️\n❤️ หากคุณอยู่ในระบบการรักษาตัวที่บ้านสำหรับผู้ป่วยโควิด-19 โปรดติดต่อคลินิกหรือโรงพยาบาลที่ดูเเลคุณ เพื่อรับการรักษาอย่างทันท่วงที  \n❤️ ไม่ต้องกังวล คุณมีช่องทางการติดต่อบุคลากรทางการเเพทย์ฉุกเฉินหรือหาเตียง ตามเบอร์ในภาพด้านล่าง 📞\n⚠️ *หมายเหตุ: การประเมินด้วย”เพื่อนช่วยเช็ค” ใช้ระบบอัตโนมัติเพื่อให้คำเเนะนำเบื้องต้น ไม่สามารถใช้เป็นใบรับรองเเพทย์ได้",
};

const redSleepingPostureImage: Message = {
  type: "image",
  originalContentUrl:
    "https://firebasestorage.googleapis.com/v0/b/comcovid-prod.appspot.com/o/TriageResults%2FRed%2Fsleeping_posture.jpg?alt=media&token=e30153fa-c5de-4f5c-97fe-1745bb095b77",
  previewImageUrl:
    "https://firebasestorage.googleapis.com/v0/b/comcovid-prod.appspot.com/o/TriageResults%2FRed%2Fsleeping_posture.jpg?alt=media&token=e30153fa-c5de-4f5c-97fe-1745bb095b77",
};

const redContactImage: Message = {
  type: "image",
  originalContentUrl:
    "https://firebasestorage.googleapis.com/v0/b/comcovid-prod.appspot.com/o/TriageResults%2FRed%2Fcontact.jpg?alt=media&token=137c5664-6673-4cc2-a2e0-5b2736fdb524",
  previewImageUrl:
    "https://firebasestorage.googleapis.com/v0/b/comcovid-prod.appspot.com/o/TriageResults%2FRed%2Fcontact.jpg?alt=media&token=137c5664-6673-4cc2-a2e0-5b2736fdb524",
};

const redMessages = [
  redDetailMessage,
  redSleepingPostureImage,
  redContactImage,
];
//end red

export { greenMessages, yellowMessages, redMessages };
