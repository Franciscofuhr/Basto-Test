// const { Cow, conn } = require("../../src/db.js");
const mongoose =require("mongoose")
// I use a test database for testing
const mongoDB="mongodb://127.0.0.1/my_test_database"
mongoose.connect(mongoDB)
const {Cow} =require("../../src/models/Cows")
const normalCow={
  idSENASA: "1234567890123456",
  type: "Novillo",

  weight: 5,
  fieldName: "field1",
  device: "Collar",
  deviceNumber: "12345678",
}

describe("Cow model", () => {
  beforeEach(async()=>{
    await Cow.remove({})
  })
  afterEach(async()=>{
    await Cow.remove({})
  })
  
  // afterEach(async()=>{
  //   await Cow.remove({})
  // })
  after(async () => {
    
    await mongoose.connection.close()
  })


  describe("Validators", () => {
    // beforeEach(() => Cow.sync({ force: true }));
    
      it("should throw an error if IDSENASA is null", (done) => {
        let testCow=new Cow({...normalCow,idSENASA:null})
          testCow.save().then(() => done(new Error("It requires a valid title"))).catch(() => done());
      });
      it("should work when IDSENASA is valid", (done) => {
        let testCow=new Cow(normalCow)
          testCow.save().then(() => done()).catch(() => done(new Error("It requires a valid title")));
      });
      it("should throw an error if type is not a valid", (done) => {
        let testCow=new Cow({
          idSENASA: "1234567890123456",
          type: "something",
        
          weight: 5,
          fieldName: "field1",
          device: "Collar",
          deviceNumber: "12345678",
        })
          testCow.save().then(() => done(new Error("It requires a valid type"))).catch(() => done());
      });
      it("should work when type is valid", (done) => {
        let testCow=new Cow(normalCow)
          testCow.save().then(() => done()).catch(() => done(new Error("It requires a valid type")));
      });
      it("should throw an error if fieldname is null", (done) => {
        let testCow=new Cow({...normalCow,fieldName:null})
          testCow.save().then(() => done(new Error("It requires a valid fielname"))).catch(() => done());
      });
      it("should work when fieldname is valid", (done) => {
        let testCow=new Cow(normalCow)
          testCow.save().then(() => done()).catch(() => done(new Error("It requires a valid fieldname")));
      });
      it("should throw an error if device is null", (done) => {
        let testCow=new Cow({...normalCow,device:null})
          testCow.save().then(() => done(new Error("It requires a valid device"))).catch(() => done());
      });
      it("should work when device is valid", (done) => {
        let testCow=new Cow(normalCow)
          testCow.save().then(() => done()).catch(() => done(new Error("It requires a valid device")));
      });
      it("should throw an error if devicenumber is null", (done) => {
        let testCow=new Cow({...normalCow,deviceNumber:null})
          testCow.save().then(() => done(new Error("It requires a valid devicenumber"))).catch(() => done());
      });
      it("should work when devicenumber is valid", (done) => {
        let testCow=new Cow(normalCow)
          testCow.save().then(() => done()).catch(() => done(new Error("It requires a valid devicenumber")));
      });
    
    
  });
});
