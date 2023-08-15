const Patient = require("../models/patient");
const User = require("../models/user");

module.exports = {
    index,
    new: addPatient,
    create: createPatient,
    show,
    dischargeAdmit
}


async function index (req, res, next) {

    try {
        if (req.query.searchQuery === "all") {
            const results = await Patient.find({}).sort("name");
            res.render('patients/index', { 
                title: "All Patients", 
                patients: results 
            })
        } else if (req.query.searchQuery === "discharged") {
            const results = await Patient.find({discharged: true});
            res.render("patients/index", {
                title: "Discharged Patients",
                patients: results
            })
        } else {
            const results = await Patient.find({discharged: false}).sort("name");
            res.render('patients/index', { 
                title: "Admitted Patients", 
                patients: results
            })
        }
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
        newPatient.admissionDates.push(new Date())
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
        const patient  = await Patient.findOne({_id: req.params.patientId}).populate("providers")
        const providers = patient.providers.map(provider => provider.name)
        // res.send(patient)
        // console.log(patient)
        res.render("patients/show", {
            title: patient.name,
            patient,
            providers
        })
    }catch(err) {
        console.log(err)
        next(Error(err))
    }
}

async function dischargeAdmit (req, res, next) {
    try{
        const patient = await Patient.findById(req.params.patientId);
        // console.log(patient)
        patient.discharged = patient.discharged ? false : true;
        if (patient.discharged) {
            patient.dischargeDates.push(new Date())
        } else {
            patient.admissionDates.push(new Date())
        }
        await patient.save()
        res.redirect('/patients')
    }
    catch (err) {
        console.log(err);
        next(Error(err));
    }
}


