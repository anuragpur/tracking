var storage = {};
storage.secret= 'appsecret';
var mongoose = require('mongoose');
var url = 'mongodb://localhost:27017/tracking';
mongoose.connect(url);

var MongoClient = require('mongodb').MongoClient;

storage.getMongooseDB = function() {
    return mongoose;
}

storage.getDB = function() {
    return new Promise(function(resolve, reject) {
        MongoClient.connect(url, function(err, connection) {
            if (!err) {
                resolve(connection);
            } else {
                reject(err);
            }
        });
    });
}

module.exports = storage;
