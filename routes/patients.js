// http://localhost3000/patients

var express = require('express');
var router = express.Router();
const patientsCtrl = require('../controllers/patients')
const ensureLoggedIn = require('../config/ensure-logged-in');


router.get('/', ensureLoggedIn, patientsCtrl.index)

router.get('/:patientId/discharge-sum', ensureLoggedIn, patientsCtrl.testChat)

router.get('/new', ensureLoggedIn, patientsCtrl.new)

router.post('/', ensureLoggedIn, patientsCtrl.create)

router.get("/:patientId", ensureLoggedIn, patientsCtrl.show)

router.put('/:patientId', ensureLoggedIn, patientsCtrl.dischargeAdmit)

module.exports = router;