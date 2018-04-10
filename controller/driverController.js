var dbService = require("../config/storage.js");
var mongoose = dbService.getMongooseDB();
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var driveRoutes = require('../model/driverRoutes');
var driveStatus = require('../model/driveStatus')

module.exports = {
    getAssignedRoute: getAssignedRoute,
    startRide:startRide,
    updateRide: updateRide

}

function getAssignedRoute(req, res) {
    driveRoutes.findOne({user_id: req.userId}, function (err, obj) {
        if (err) res.status(500).json({code: '500', message: 'something went wrong.'});
        else {
            if (obj == null)
                res.status(403).json({code: '403', message: 'no route is assigned to you.'})
            else {
                res.status(200).json({code: '200', message: 'successfully fetched the route.', data:obj})
            }
        }
    })
}

function startRide(req,res) {
    req.body.user_id = req.userId;
    var dstatus = new driveStatus(req.body);
    dstatus.save(function (err, obj) {
        if(err) res.status(422).json({code:'422', errors:err})
        else{
            res.status(200).json({code:'200', message:'successful', data:{id:obj._id}})
        }
    })
}

function updateRide(req,res) {
    driveStatus.findAndUpdate({_id: ObjectId(req.params.id)},{$set:req.body},function (err, data) {
        if(err) res.status(500).json({code:'500', error:err})
        res.status(200).json({code:'200', message:'success'})
    })
}