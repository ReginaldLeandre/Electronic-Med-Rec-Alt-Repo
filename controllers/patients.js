const Patient = require("../models/patient");
const User = require("../models/user");

module.exports = {
    index,
    new: addPatient,
    create: createPatient,
    show
}


async function index (req, res, next) {

    try {
        const results = await Patient.find({discharged: false}).sort("name");
        res.render('patients/index', { 
            title: "All Patients", 
            patients: results 
        })
    } catch (err) {
        console.log(err);
        next (Error(err))
    }
}



 function addPatient(req, res, next) {
    
        // const { name, DOB, chiefComplaint, medHx } = req.body;
        // const newPatient = new Patient({ name, DOB, chiefComplaint, medHx });
        // await newPatient.save();
        res.render("patients/new", {title: "Add New Patient"})
    
        // console.log("Patient added Successfully!");
      
}




async function createPatient(req, res, next) {

    try {
        const { name, DOB, chiefComplaint, medHx } = req.body;
        const newPatient = new Patient({ name, DOB, chiefComplaint, medHx });
        await newPatient.save();
        // const newPatient = {...req.body}
        // await Patient.create(newPatient)
        console.log("Patient added Successfully!");
        res.redirect('/patients');
      } catch (error) {
        console.log(err.message);
        next (Error(err));
      }
}


async function show (req, res, next) {
    try {
        const patient  = await Patient.findOne({_id: req.params.patientId})
        // res.send(patient)
        // console.log(patient)
        res.render("patients/show", {
            title: patient.name,
            patient
        })
    }catch(err) {
        console.log(err)
        next(Error(err))
    }
}

