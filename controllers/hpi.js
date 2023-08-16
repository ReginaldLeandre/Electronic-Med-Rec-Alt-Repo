const Patient = require("../models/patient");
const User = require("../models/user");

module.exports = {
    newHpi,
    createHpi,
    delete: deleteOne
}


async function newHpi (req, res, next) {
    try {
        const patient = await Patient.findById(req.params.patientId)
        // res.send(patient)
        res.render("hpi/new", {
            title: `Add hpi for: ${patient.name}`,
            patient
        })
    }catch(err) {
        console.log(err)
        next(Error(err))
    }
}

async function createHpi (req, res, next) {
    try{
        const patient = await Patient.findById(req.params.patientId)
        newData = {...req.body}
        console.log("finding req.body ", newData)
        patient.hpi.unshift(newData)
        await patient.save()
        res.redirect(`/patients/${patient._id}`)
    }catch(err) {
        console.log(err)
        next(Error(err))
    }
}

async function deleteOne (req, res, next) {
    console.log("deleting one")
    try{
        const patient = await Patient.findById(req.params.patientId)
        patient.hpi.remove({_id: req.params.hpiId})
        patient.save()
        res.redirect(`/patients/${req.params.patientId}`)
    }catch(err) {
        console.log(err)
        next(Error(err))
    }
}
