var createError = require('http-errors');
var express = require('express');
var path = require('path');
//var logger = require('morgan');
var nodeFileEnv = require('node-file-env');
var session = require('express-session')
var cookieParser = require('cookie-parser');
const helmet = require('helmet')

var app = express()
// load env variables
nodeFileEnv().load()
require('./database/knex')

app.disable("x-powered-by");
app.use(helmet())

app.use(session({
  secret: 'my-secret-code',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false, maxAge: 3600000 }
}))

var Role = require('./model/Role.enum')
var format = require('./util/format')
app.use(function (req, res, next) {
  if (req.session.userInfo) {
    res.locals.userInfo = req.session.userInfo
    res.locals.avatar = req.session.avatar
  }

  res.locals.chefStationInfo = req.session.chefStationInfo
  res.locals.formatDate = format
  res.locals.Role = Role
  //res.locals.request = req
  res.locals.chefStations = req.session.chefStations
  next()
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//app.use(logger('prod'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());

app.get('/404', (req, res) => { res.render('404') })

// routers
require('./routes.config').forEach(r => {
  app.use(r.path, require(r.source))
})

app.get('*', (req, res) => { res.redirect('/404') })

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {

  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



module.exports = app;
