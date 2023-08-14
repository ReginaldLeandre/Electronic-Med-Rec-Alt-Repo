const Patient = require("../models/patient");
const User = require("../models/user");

module.exports = {
    newVitals,
    // createVitals

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
