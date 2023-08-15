var express = require('express');
var router = express.Router();

const usersCtrl = require('../controllers/users')


router.get('/', usersCtrl.index)

router.get('/new', usersCtrl.new)

router.post("/", usersCtrl.create)

router.get("/:userId", usersCtrl.show)

router.post("/:userId", usersCtrl.addToProvider)

router.put("/:userId", usersCtrl.removeFromProvider)

router.get("/:userId/edit", usersCtrl.edit)

router.put("/", usersCtrl.update)

module.exports = router;
