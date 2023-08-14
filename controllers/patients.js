const Patient = require("../models/patient");
const User = require("../models/user");

module.exports = {
    index,
    new: addPatient,
    create: createPatient
}


async function index (req, res, next) {

    try {
        const results = await Patient.find({discharged: false});
        res.render('patients/index', { title: "All Patients", patients: results })
    } catch (err) {
        console.log(err.message);
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
        // const { name, DOB, chiefComplaint, medHx } = req.body;
        // const newPatient = new Patient({ name, DOB, chiefComplaint, medHx });
        const newPatient = {...req.body}
        await Patient.create(newPatient)
        console.log("Patient added Successfully!");
        res.redirect('/patients');
      } catch (error) {
        console.log(err.message);
        next (Error(err));
      }
}