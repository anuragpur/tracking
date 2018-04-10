var dbService = require("../config/storage.js");
var mongoose = dbService.getMongooseDB();

var userRoutesSchema = new mongoose.Schema({
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


var userRoutesSchema = mongoose.model('userRoute', userRoutesSchema);

module.exports = userRoutesSchema;