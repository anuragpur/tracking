var dbService = require("../config/storage.js");
var mongoose = dbService.getMongooseDB();

var routesSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    route_id: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    }
});


var routesSchema = mongoose.model('driveRoute', routesSchema);

module.exports = routesSchema;