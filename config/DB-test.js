//  connection string - .env
require('dotenv').config()

// db - connection
require('./database')

// import model - Patient
const Patient = require("../models/patient");

// false data
const vitals1 = {
    heartRate: 80,
    systolic: 120,
    diastolic: 80,
    respirations: 12,
    oxygenSat: 98,
    temp: 37,
    time: new Date()
}

async function addOnePatient(data) {
    try {
        const newPatient = await Patient.create(data)
        console.log(newPatient)
    }catch(err) {
        console.log(err)
    }
    process.exit()
}

const patient2 = {
    name: "Jane Doe",
    DOB: new Date(),
    medHx: ["T2DM, AKF"],
    chiefComplaint: "AKF",
}

addOnePatient(patient2)

// const patientSchema = new Schema( {
//     name: {
//       type: String,
//     },
//     DOB: {
//       type: Date
//     },
//     medHx: {
//       type: [String]
//     },
//     chiefComplaint: {
//       type: String
//     },
//     providers: [{
//       type: Schema.Types.ObjectId, 
//       ref: "User"
      
//     }],
//     vitals: [vitalSchema]
// },
// {
//     timestamps: true,
// })


// const vitalSchema = new Schema( {
//     heartRate: {
//       type: Number,
//       min: 0,
//     },
//     systolic: {
//       type: Number,
//       min: 0
//     },
//     diastolic: {
//       type: Number,
//       min: 0
//     },
//     respirations: {
//       type: Number,
//       min: 0
//     },
//     oxygenSat: {
//       type: Number,
//       min: 0,
//       max: 100
//     },
//     temp: {
//       type: Number,
//       min: 0
//     },
//     time: {
//       type: String,
//     }
//   },
//   {
//     timestamps: true,
//   }
// );