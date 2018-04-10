var dbService = require("../config/storage.js");
var mongoose = dbService.getMongooseDB();

var driveSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    route_id: {
        type: String,
        required: true
    },
    lat: {
        type: String,
        required: true
    },
    long: {
        type: String,
        required: true
    },
    time_zone: {
        type: String,
        required: true
    },
    start_time: {
        type: Date,
        default: Date.now
    },
    end_time: {
        type: Date,
        default: ''
    },
    created: {
        type: Date,
        default: Date.now
    }
});


var driveStatus = mongoose.model('driveStatus', driveSchema);

module.exports = driveStatus;