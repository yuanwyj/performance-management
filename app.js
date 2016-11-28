var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var routes = require('./routes/index');
var reg = require('./routes/reg');
var login = require('./routes/login');
var logout = require('./routes/logout');
var teacher = require('./routes/teacher');
var search_teacher = require('./routes/search_Teacher');
var student = require('./routes/student');
var search_Student = require('./routes/search_Student');
var arrangment = require('./routes/arrangment');
var search_course = require('./routes/search_course');
var search_grade = require('./routes/search_grade');
var entering = require('./routes/entering');
var personal = require('./routes/personal');
var chose_kc = require('./routes/chose_kc');
var stdscore = require('./routes/stdscore');

var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser('Wilson'));
app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60*60*24*30 }, resave: true, saveUninitialized: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/reg',reg);
app.use('/login',login);
app.use('/logout',logout);
app.use('/teacher',teacher);
app.use('/search_Teacher',search_teacher);
app.use('/student',student);
app.use('/search_Student',search_Student);
app.use('/arrangment',arrangment);
app.use('/search_course',search_course);
app.use('/search_grade',search_grade);
app.use('/entering',entering);
app.use('/personal',personal);
app.use('/chose_kc',chose_kc);
app.use('/stdscore',stdscore);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
