const Patient = require("../models/patient");
const User = require("../models/user");
const lineBreak = require("../config/line-breaks.js");

module.exports = {
    newProgressNote,
    createProgressNote,
    delete: deleteOne,
    index
}

function returnDate() {
    return new Date()
  }

async function newProgressNote (req, res, next) {
    try {
        const patient = await Patient.findById(req.params.patientId)
        // res.send(patient)
        res.render("progress-notes/new", {
            title: `New Progress Note: ${patient.name}`,
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

        for (let key in newData) {
            if (newData[key] === "") delete newData[key]
        }
        newData.user = req.user._id
        newData.userName = req.user.name
        newData.userAvatar = req.user.avatar
        newData.time = returnDate()

        newData.hpi = lineBreak(newData.hpi)
        newData.objective = lineBreak(newData.objective)
        newData.ap = lineBreak(newData.ap)
        console.log("finding req.body ", newData)
        patient.progressNotes.unshift(newData)
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

async function index (req, res, next) {
    try {
        console.log("indexing progress notes")
        const patient = await Patient.findById(req.params.patientId)
        res.render("progress-notes/index", {
            title: `${patient.name} - All Progress Notes`,
            patient
        })
    } catch(err) {
        console.log(err)
        next(Error(err))
    }
}