
var express = require('express');
var router = express.Router();

const progressNotesCtrl = require('../controllers/progress-notes')

const ensureLoggedIn = require('../config/ensure-logged-in');


router.get("/patients/:patientId/progress-notes/new", ensureLoggedIn, progressNotesCtrl.newProgressNote)

router.get("/patients/:patientId/progress-notes", ensureLoggedIn, progressNotesCtrl.index)

router.post("/patients/:patientId/progress-notes", ensureLoggedIn, progressNotesCtrl.createProgressNote)

router.delete("/patients/:patientId/progress-notes/:progressNoteId", ensureLoggedIn, progressNotesCtrl.delete)

module.exports = router;
