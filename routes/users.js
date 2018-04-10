var express = require('express');
var router = express.Router();
var loginAndRegister = require('../controller/registerAndLogin.js')


router.post('/register', loginAndRegister.registerAUser);

router.post('/login', loginAndRegister.loginInAUser);

module.exports = router;
