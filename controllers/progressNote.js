const Patient = require("../models/patient");
const User = require("../models/user");

const lineBreak = require("../config/lineBreaks.js");

module.exports = {
    newProgressNote,
    createProgressNote,
    delete: deleteOne
}


async function newProgressNote (req, res, next) {
    try {
        const patient = await Patient.findById(req.params.patientId)
        // res.send(patient)
        res.render("progress-note/new", {
            title: `Add progress note for: ${patient.name}`,
            patient
        })
    }catch(err) {
        console.log(err)
        next(Error(err))
    }
}

async function createProgressNote (req, res, next) {
    try{
        const patient = await Patient.findById(req.params.patientId)
        newData = {...req.body}

        newData.hpi = lineBreak(newData.hpi)
        newData.objective = lineBreak(newData.objective)
        newData.ap = lineBreak(newData.ap)
    
        console.log("finding req.body ", newData)
        patient.progressNote.unshift(newData)
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
