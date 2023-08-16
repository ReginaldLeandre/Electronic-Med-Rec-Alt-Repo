
var express = require('express');
var router = express.Router();

const progressNoteCtrl = require('../controllers/progressNote')

const ensureLoggedIn = require('../config/ensureLoggedIn');


router.get("/patients/:patientId/progress-note/new", ensureLoggedIn, progressNoteCtrl.newProgressNote)

router.post("/patients/:patientId/progress-note", ensureLoggedIn, progressNoteCtrl.createProgressNote)

router.delete("/patients/:patientId/progress-note/:progressNoteId", ensureLoggedIn, progressNoteCtrl.delete)

module.exports = router;
