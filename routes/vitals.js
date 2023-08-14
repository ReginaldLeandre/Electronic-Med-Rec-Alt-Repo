// http://localhost3000/

var express = require('express');
var router = express.Router();

const vitalsCtrl = require('../controllers/vitals')


router.get("/patients/:patientId/vitals/new", vitalsCtrl.newVitals)

router.post("/patients/:patientId", vitalsCtrl.createVitals)

module.exports = router;
