var express = require('express');
var router = express.Router();

const patientsCtrl = require('../controllers/patients')


router.get('/', patientsCtrl.index)


module.exports = router;