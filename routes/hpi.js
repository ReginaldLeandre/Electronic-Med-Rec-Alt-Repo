
var express = require('express');
var router = express.Router();

const hpiCtrl = require('../controllers/hpi')

const ensureLoggedIn = require('../config/ensureLoggedIn');


router.get("/patients/:patientId/hpi/new", ensureLoggedIn, hpiCtrl.newHpi)

router.post("/patients/:patientId/hpi", ensureLoggedIn, hpiCtrl.createHpi)

router.delete("/patients/:patientId/hpi/:hpiId", ensureLoggedIn, hpiCtrl.delete)

module.exports = router;
