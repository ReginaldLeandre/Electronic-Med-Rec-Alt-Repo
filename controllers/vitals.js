const Patient = require("../models/patient");
const User = require("../models/user");

module.exports = {
    newVitals,
    createVitals,
    delete: deleteOne

}

async function newVitals(req, res, next) {
    try {
        const patient = await Patient.findById(req.params.patientId)
        // res.send(patient)
        res.render("vitals/new", {
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
        // console.log("creaing vitals")
        const patient = await Patient.findById(req.params.patientId)
        newData = {...req.body}
        patient.vitals.unshift(newData)
        await patient.save()
        res.redirect(`/patients/${patient._id}`)
    }catch(err) {
        console.log(err)
        next(Error(err))
    }
}

async function deleteOne(req, res, next) {
    console.log("deleting one")
    try{
        const patient = await Patient.findById(req.params.patientId)
        patient.vitals.remove({_id: req.params.vitalId})
        patient.save()
        res.redirect(`/patients/${req.params.patientId}`)
    }catch(err) {
        console.log(err)
        next(Error(err))
    }
}