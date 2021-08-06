const { setPatientStatus, snapshotExists, addCreatedDate } = require("./utils");
const { admin } = require("../../init");
const functions = require("firebase-functions");

describe("setPatientStatus", () => {
  it("should setPatientStatus correctly", () => {
    const mockObj = {};
    const createdDate = new Date();
    setPatientStatus(mockObj, createdDate);
    expect(mockObj).toEqual({
      status: 0,
      needFollowUp: true,
      followUp: [],
      createdDate: admin.firestore.Timestamp.fromDate(createdDate),
      lastUpdatedAt: admin.firestore.Timestamp.fromDate(createdDate),
      isRequestToCallExported: false,
      isRequestToCall: false,
      isNurseExported: false,
      toAmed: 0,
    });
  });
});

describe("snapshotExists", () => {
  it("throw amed", () => {
    function checkExists() {
      const mockSnapshot = { exists: true, data: () => ({ toAmed: 1 }) };
      snapshotExists(mockSnapshot);
    }
    expect(checkExists).toThrowError(
      "your information is already handle by Amed"
    );
  });
  it("throw มีข้อมูลแล้ว", () => {
    function checkExists() {
      const mockSnapshot = { exists: true, data: () => ({ toAmed: 0 }) };
      snapshotExists(mockSnapshot);
    }
    expect(checkExists).toThrowError("มีข้อมูลผู้ใช้ในระบบแล้ว");
  });
});

describe("addCreatedDate", () => {
  it("should add createdDate correctly", () => {
    const mockObj = {};
    const createdDate = new Date();
    addCreatedDate(mockObj, createdDate);
    expect(mockObj).toEqual({
      createdDate: admin.firestore.Timestamp.fromDate(createdDate),
    });
  });
});
