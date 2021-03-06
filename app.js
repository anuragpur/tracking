var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var cors = require('cors');
var config = require('./config/storage').getDB()


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var routes = require('./routes/routes')

var app = express();
app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api', usersRouter);

// catch 404 and forward to error handler
//app.use(function(req, res, next) {
 // next(createError(404));
//});

// app middleware that will happen on every request to check JWT
app.use(function (req, res, next) {
    var token = req.header('Authorization') || req.query.state;
    if (token) {
        jwt.verify(token,'appsecret', function (err, decoded) {
console.log(err)
            if (err) {
                return res.status(401).json({success: false, message: 'Failed to authenticate token.'});
            } else {
console.log(decoded)
                req.userId = decoded.userId;
                req.role = decoded.role;
                next();
            }
        });
    } else {
        return res.status(401).send({
            success: false,
            message: 'No token provided.'
        });
    }
});
//end

app.use('/api', routes);

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'

app.listen(server_port, server_ip_address, function () {
    console.log( "Listening on " + server_ip_address + ", port " + server_port )
});

module.exports = app;
