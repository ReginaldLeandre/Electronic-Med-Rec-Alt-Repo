
var express = require('express');
var router = express.Router();

const progressNoteCtrl = require('../controllers/progress-notes')

const ensureLoggedIn = require('../config/ensure-logged-in');


router.get("/patients/:patientId/progress-note/new", ensureLoggedIn, progressNoteCtrl.newProgressNote)

router.post("/patients/:patientId/progress-note", ensureLoggedIn, progressNoteCtrl.createProgressNote)

router.delete("/patients/:patientId/progress-note/:progressNoteId", ensureLoggedIn, progressNoteCtrl.delete)

module.exports = router;
