const { application } = require("express");
const Patient = require("../models/patient");
const User = require("../models/user");
const lineBreak = require("../config/line-breaks.js");
var OpenAiApi = require("openai");

module.exports = {
    index,
    new: addPatient,
    create: createPatient,
    show,
    dischargeAdmit,
    testChat: generateDS
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
        res.render("patients/new", {title: "Add New Patient"})
}

async function createPatient(req, res, next) {

    try {
        const { name, DOB, chiefComplaint, medHx } = req.body;
        const newPatient = new Patient({ name, DOB, chiefComplaint, medHx });
        await newPatient.save();
        newPatient.admissionDates.push(new Date())

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
        const providers = patient.providers
        const avatars = patient.providers.map(provider => (provider.avatar))
        res.render("patients/show", {
            title: patient.name,
            patient,
            providers,
            avatars
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

async function generateDS(req, res, next) {
    console.log("generating ds summary")
    const openai = new OpenAiApi({
        apiKey: process.env.OPENAI_API_KEY,
    });
    try {
        let allNotes = ""
        const patient = await Patient.findById(req.params.patientId)
        console.log("found patient", patient)
        patient.progressNotes.forEach(function(note) {
            allNotes += note
        })
        const completion = await openai.chat.completions.create({
            messages: [{ role: 'user', content: `write me a hospital discharge summary for a patient named ${patient.name} based on the following progress notes: ${allNotes}. Lookup the current date and current time and reference these values as time and date for discharge` }],
            model: 'gpt-3.5-turbo',
          });
        const output = completion.choices[0].message.content

        let formattedOutput = lineBreak(output)

        res.render("patients/discharge-summary",{
            title: `${patient.name}: Discharge Summary`,
            patient,
            formattedOutput
        })

    }catch(err) {
        console.log(err)
        next(Error(err))
    }
}