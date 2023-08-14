var express = require('express');
var router = express.Router();

const patientsCtrl = require('../controllers/patients')


router.get('/', patientsCtrl.index)
router.get('/new', patientsCtrl.new)
router.post('/', patientsCtrl.create)


module.exports = router;