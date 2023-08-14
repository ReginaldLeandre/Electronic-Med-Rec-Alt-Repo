// http://localhost3000/patients

var express = require('express');
var router = express.Router();

const patientsCtrl = require('../controllers/patients')


router.get('/', patientsCtrl.index)

router.get("/:patientId", patientsCtrl.show)


module.exports = router;