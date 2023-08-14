const Patient = require("../models/patient");
const User = require("../models/user");

module.exports = {
    newVitals,
    createVitals

}

async function newVitals(req, res, next) {
    try {
        const patient = await Patient.findById(req.params.patientId)
        // res.send(patient)
        res.render("patients/newVitals", {
            title: `Add vital signs for: ${patient.name}`,
            patient
        })
    }catch(err) {
        console.log(err)
        next(Error(err))
    }
}

async function createVitals(req, res, next) {
    try{
        console.log("creaing vitals")
        const patient = await Patient.findById(req.params.patientId)
        newData = {...req.body}
        patient.vitals.push(newData)
        await patient.save()
        res.redirect(`/patients/${patient._id}`)
    }catch(err) {
        console.log(err)
        next(Error(err))
    }
}