// http://localhost3000/patients

var express = require('express');
var router = express.Router();

const patientsCtrl = require('../controllers/patients')


router.get('/', patientsCtrl.index)
router.get('/new', patientsCtrl.new)
router.post('/', patientsCtrl.create)



router.get("/:patientId", patientsCtrl.show)
router.put('/:patientId', patientsCtrl.discharge)


module.exports = router;