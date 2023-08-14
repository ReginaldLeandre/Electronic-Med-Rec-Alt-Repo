var express = require('express');
var router = express.Router();

const usersCtrl = require('../controllers/users')


router.get('/', usersCtrl.index)

router.get('/new', usersCtrl.new)

router.post("/", usersCtrl.create)

router.get("/:userId", usersCtrl.show)


module.exports = router;
