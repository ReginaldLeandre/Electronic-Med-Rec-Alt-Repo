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
    name: "John Doe",
    DOB: new Date(),
    medHx: ["T2DM, AKF"],
    chiefComplaint: "T2DM",
    discharged: true
}

addOnePatient(patient2)

async function deleteAllPatients() {
    try {
        await Patient.deleteMany({})
        console.log("deleted all patients")
    }catch(err) {
        console.log(err)
    }
    process.exit()
}

// deleteAllPatients()

