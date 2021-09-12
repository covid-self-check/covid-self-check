import { Message } from "@line/bot-sdk/dist/types";

const symptomListMessage: Message = {
  type: "text",
  text: "อาการทั่วไป (พบได้บ่อย)👇🏻\n-  มีไข้\n-  ไอแห้ง\n- อ่อนเพลีย\n\nอาการที่พบไม่บ่อยนัก👇🏻\n- ปวดเมื่อยเนื้อตัว\n- เจ็บคอ\n- ท้องเสีย\n- ตาแดง\n- ปวดศีรษะ\n- สูญเสียความสามารถในการดมกลิ่นและรับรส\n- มีผื่นบนผิวหนัง หรือนิ้วมือนิ้วเท้าเปลี่ยนสี",
};

const symptomCarousel: Message = {
  type: "template",
  altText: "อาการที่อาจพบ",
  template: {
    type: "image_carousel",
    columns: [
      {
        imageUrl:
          "https://firebasestorage.googleapis.com/v0/b/comcovid-prod.appspot.com/o/Symptoms%2Fcover_breathe.jpg?alt=media&token=be692fed-18c5-48b6-906a-d994c4c3c324",
        action: {
          type: "message",
          text: "หายใจลำบาก",
        },
      },
      {
        imageUrl:
          "https://firebasestorage.googleapis.com/v0/b/comcovid-prod.appspot.com/o/Symptoms%2Fcover_fever.jpg?alt=media&token=3f872abd-ee52-4d31-a08e-16b7e57eb7d5",
        action: {
          type: "message",
          text: "มีไข้",
        },
      },
      {
        imageUrl:
          "https://firebasestorage.googleapis.com/v0/b/comcovid-prod.appspot.com/o/Symptoms%2Fcover_cough.jpg?alt=media&token=8a979569-17cb-4e7b-80fd-3cd09c2493b7",
        action: {
          type: "message",
          text: "ไอเจ็บคอ",
        },
      },
      {
        imageUrl:
          "https://firebasestorage.googleapis.com/v0/b/comcovid-prod.appspot.com/o/Symptoms%2Fcover_stomach.jpg?alt=media&token=1e718029-4aa3-4aa5-ac35-634b08ca5dc0",
        action: {
          type: "message",
          text: "ท้องเสีย",
        },
      },
    ],
  },
};

const coughMessage: Message = {
  type: "text",
  text: "💦 จิบน้ำบ่อยๆระหว่างวัน\n💊 รับประทานยาแก้ไอ หรือยาอมบรรเทาอาการไอ\n🍵 ดื่มเครื่องดื่มอุ่นๆ เช่น ชา ซุป ช่วยลดเสมหะในทางเดินหายใจส่วนบนได้\n🍯 จิบน้ำผึ้งผสมชาร้อน หรือน้ำอุ่น เนื่องจาก น้ำผึ้งช่วยบรรเทาอาการเจ็บคอได้ แต่ไม่แนะนำให้ทานน้ำผึ้งในเด็กอายุต่ำกว่า 1 ปี\n💨 หายใจในบริเวณที่มีไอน้ำมาก โดยสามารถใช้ เครื่องทำน้ำร้อน เครื่องทำความชื้น(humidifier) เครื่องทำไอระเหย(vaporizer) หรือวิธีอื่นๆที่จะช่วยทำให้เกิดไอน้ำ ซึ่งจะช่วยลดอาการเจ็บคอ เปิดทางเดินหายใจ และทำให้หายใจง่ายขึ้น\n🆙 เลี่ยงการนอนราบ ให้นอนตะแคง หรือนอนหมอนสูง",
};

const feverMessage: Message = {
  type: "text",
  text: "💊 ทานยาลดไข้ เช่น พาราเซตามอล  \n🤒 เช็ดตัวเพื่อลดไข้ บริเวณคอ ข้อพับต่างๆ\n💦 ดื่มน้ำให้เพียงพอ  เนื่องจากอาการไข้มักทำให้เหงื่อออก ซึ่งทำให้ร่างกายสูญเสียน้ำได้ เมื่อดื่มเพียงพอ ปัสสาวะ จะเป็นสีเหลืองอ่อน โดยอาจจะเป็นน้ำเปล่าหรือน้ำผลไม้ แต่ไม่ควรเป็นเครื่องดื่มโซดา หรือเครื่องดื่มน้ำตาลสูงที่อาจทำให้หิวน้ำเพิ่มขึ้น และ ไม่ควรดื่มเครื่องดื่มที่มีคาเฟอีน\n😴 พักผ่อนให้เพียงพอ 7-8 ชั่วโมงต่อวัน",
};

const stomachMessage: Message = {
  type: "text",
  text: "🙅‍♀️ งดทานอาหารประเภท นม โยเกิร์ต ผลไม้สด และ อาหารที่ย่อยยาก\n💦 ชงเกลือแร่ ORS ผสมน้ำต้มสุก น้ำสะอาด จิบเรื่อยๆ ทั้งวัน (⚠️ในผู้ป่วยที่เป็นโรคไตและโรคหัวใจควรปรึกษาแพทย์ก่อน)\n👌🏻 หากรับประทานอาหารไม่ได้ ให้รับประทานน้อยๆ แต่บ่อยๆ",
};

const breatheMessage: Message = {
  type: "text",
  text: "🍃 เปิดหน้าต่าง อยู่ในห้องที่อากาศถ่ายเท\n😮‍💨 หายใจช้าๆ ลึกๆ ทางจมูกและปาก\n🆙 นั่งตัวตรง ไม่นั่งหลังค่อม ผ่อนคลายบริเวณหัวไหล่\n🧘 เอนตัวมาข้างหน้าเล็กน้อย โดยใช้มือวางบนหน้าขาทั้งสองข้าง และ หายใจลึกๆ ยาวๆ\n☺️ พยายาม อย่าเครียด ตื่นตกใจ\n🆙 เวลานอนให้นอนตะแคง หรือ นอนหมอนสูง",
};

export {
  symptomCarousel,
  coughMessage,
  feverMessage,
  stomachMessage,
  breatheMessage,
  symptomListMessage,
};
