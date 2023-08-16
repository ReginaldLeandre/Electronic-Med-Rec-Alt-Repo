// http://localhost3000/

var express = require('express');
var router = express.Router();

const vitalsCtrl = require('../controllers/vitals')

const ensureLoggedIn = require('../config/ensure-logged-in');


router.get("/patients/:patientId/vitals/new", ensureLoggedIn, vitalsCtrl.newVitals)

router.post("/patients/:patientId/vitals", ensureLoggedIn, vitalsCtrl.createVitals)

router.delete("/patients/:patientId/vitals/:vitalId", ensureLoggedIn, vitalsCtrl.delete)

module.exports = router;

