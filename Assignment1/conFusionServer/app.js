var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
const categoryRoute = require('./routes/categoryRouter');
const registerRoute = require('./routes/registerRouter');
const loginRoute = require('./routes/loginRouter');
const jwtAuthen =  require('./controller/authenJWT')

//Use Mongoose and Mongo DB 
const mongoose = require('mongoose');
const dbName = 'conFusion';
const dbPort = '27017';
const dbType = 'mongodb';
const dbHost = 'localhost';
const dbURL = `${dbType}://${dbHost}:${dbPort}/${dbName}`;
const connect = mongoose.connect(dbURL);
connect.then((db)=>{
  console.log(`Connected to ${dbName} database at: ${dbURL}`);
})

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//API
app.use('/', indexRouter);
app.use('/api/category',jwtAuthen, categoryRoute);
app.use('/api/register', registerRoute);
app.use('/api/login', loginRoute);

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
