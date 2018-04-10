var driveRoutes = require('../model/driverRoutes');
var userRotes = require('../model/userRoutes')

module.exports = {
    assignRoutesToDriver: assignRoutesToDriver,
    assignRoutesToUser:assignRoutesToUser

}

function assignRoutesToDriver(req, res) {
    if (req.role == 'admin') {
        var route = new driveRoutes(req.body);
        route.save(function (err, obj) {
            if (err) res.status(422).json({code: 422, errors: err})
            res.status(200).json({code: 200, message: 'route assigned successfully.'});
        })
    } else {
        res.status(403).json({code: 403, message: 'you are not authorized to do this operation.'})
    }

}

function assignRoutesToUser() {
    if (req.role == 'admin') {
        var route = new userRotes(req.body);
        route.save(function (err, obj) {
            if (err) res.status(422).json({code: 422, errors: err})
            res.status(200).json({code: 200, message: 'route assigned successfully.'});
        })
    } else {
        res.status(403).json({code: 403, message: 'you are not authorized to do this operation.'})
    }
}