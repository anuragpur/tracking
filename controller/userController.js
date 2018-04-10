var userRoutes = require('../model/userRoutes')
var driverRoutes = require('../model/driverRoutes')
var dstatus = require('../model/driveStatus')

module.exports ={
    getRouteStatus:getRouteStatus
}

function getRouteStatus(req,res) {
    userRoutes.findOne({user_id:req.userId},function (err, obj) {
        if(err) res.status(500).json({code:'500',errors:err})
        else{
            if(obj == null)
                res.send('no route assigned to u')
            else{
                dstatus.findOne({route_id:obj.route_id}).sort({ _id: -1 }).limit(1).exec(function (err, obj) {
                    if(err) res.status(500).json({code:'500',errors:err})
                    else {
                        if(obj== null) res.status(200).json({code:'200', message:'driver hasnt started the ride yet', data:null})
                        else{
                            res.status(200).json({code:'200', message:'fetching', data:obj})
                        }
                    }
                })
            }
        }
    })
}