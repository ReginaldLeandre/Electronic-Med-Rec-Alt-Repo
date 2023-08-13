const Patient = require("../models/patient");
const User = require("../models/user");

module.exports = {
    index

}


async function index (req, res, next) {

    try {
        const results = await Patient.find({});
        res.render('patients/index', { title: "All Patients", patients: results })
    } catch (err) {
        console.log(err.message);
        next (Error(err))
    }
}