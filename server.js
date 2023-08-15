var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var session = require('express-session');
// added for auth
var passport = require('passport');
// added for auth

require('dotenv').config();
//
require('./config/database');
// 
require('./config/passport');
// added for auth

const methodOverride = require("method-override")


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var patientsRouter = require('./routes/patients');
var vitalsRouter = require('./routes/vitals');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true
}));
// added for auth

app.use(passport.initialize());
app.use(passport.session());
// added for auth

app.use(function (req, res, next) {
  res.locals.user = req.user;
  next();
});
// added for auth; has to be below passport app.use

app.use(methodOverride("_method"))

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use("/", vitalsRouter)
app.use('/patients', patientsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
