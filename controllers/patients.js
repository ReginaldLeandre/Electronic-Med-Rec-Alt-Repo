const Patient = require("../models/patient");
const User = require("../models/user");

module.exports = {
    index,
    show
}


async function index (req, res, next) {

    try {
        const results = await Patient.find({discharged: false});
        res.render('patients/index', { 
            title: "All Patients", 
            patients: results 
        })
    } catch (err) {
        console.log(err);
        next (Error(err))
    }
}

async function show (req, res, next) {
    try {
        const patient  = await Patient.findOne({_id: req.params.patientId})
        // res.send(patient)
        console.log(patient)
        res.render("patients/show", {
            title: patient.name,
            patient
        })
    }catch(err) {
        console.log(err)
        next(Error(err))
    }
}