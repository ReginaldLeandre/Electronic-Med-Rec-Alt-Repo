var express = require('express');
var router = express.Router();
const usersCtrl = require('../controllers/users')
const ensureLoggedIn = require('../config/ensure-logged-in');


router.get('/', ensureLoggedIn, usersCtrl.index)

router.get('/new', ensureLoggedIn, usersCtrl.new)

router.post("/", ensureLoggedIn, usersCtrl.create)

router.get("/:userId", ensureLoggedIn, usersCtrl.show)

router.post("/:userId", ensureLoggedIn, usersCtrl.addToProvider)

router.put("/:userId", ensureLoggedIn, usersCtrl.removeFromProvider)

router.get("/:userId/edit", ensureLoggedIn, usersCtrl.edit)

router.put("/", ensureLoggedIn, usersCtrl.update)

module.exports = router;
