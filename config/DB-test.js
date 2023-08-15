//  connection string - .env
require('dotenv').config()

// db - connection
require('./database')

// import model - Patient
const Patient = require("../models/patient");
const User = require("../models/user");


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


const patient3 = {
    name: "Patient Test with provider",
    DOB: new Date(),
    medHx: ["T2DM, AKF"],
    chiefComplaint: "T2DM",
    discharged: false,
    providers: ["64da409988fbb708f00dd52a"]
}


const patient4 = {
    name: "Patient Test with two providers (named test and test2)",
    DOB: new Date(),
    medHx: ["T2DM, AKF"],
    chiefComplaint: "T2DM",
    discharged: false,
    providers: ["64da409988fbb708f00dd52a", "64da44c0569f5e942c2ebd6f"]
}


const user1 = {
    name: "Will",
    role: "nurse"
}

const user2 = {
    name: "Rob",
    role: "renal fellow"
}

// addOneUser(user2)

async function addOneUser(data) {
    try {
        const newUser = await User.create(data)
        console.log(newUser)
    }catch(err) {
        console.log(err)
    }
    process.exit()
}

const patient8 = {
    name: "Sesame Seed",
    DOB: new Date(),
    medHx: ["AKI, renal failure, hip # in 2010"],
    chiefComplaint: "groin pain",
    discharged: true
}

// addOnePatient(patient8)

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



async function deleteAllUsers() {
    try {
        await User.deleteMany({})
        console.log("deleted all users")
    }catch(err) {
        console.log(err)
    }
    process.exit()
}


// deleteAllUsers()
async function assignAdmin(stringName) {
    const user = await User.findOne({name: stringName})
    user.admin = true
    await user.save()
    console.log(user)
}

// assignAdmin("William H")