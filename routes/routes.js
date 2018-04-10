var express = require('express');
var router = express.Router();
var adminController = require('../controller/adminController')
var driverController = require('../controller/driverController')
var userController = require('../controller/userController')

router.post('/assign/route', adminController.assignRoutesToDriver);

router.get('/assign/route', driverController.getAssignedRoute);

router.post('/start/drive', driverController.startRide);

router.put('/start/drive/:id', driverController.updateRide);

router.post('/user/assign/route', adminController.assignRoutesToUser);

router.get('/route/status', userController.getRouteStatus)

module.exports = router;