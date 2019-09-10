var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var nodeFileEnv = require('node-file-env');

var app = express();

nodeFileEnv().load();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// routers
app.use('/', require('./routes/index'));
app.use('/login',  require('./routes/login'));
app.use('/register',  require('./routes/register'));

app.use('/user/profile',  require('./routes/users/profile'));

// admin routes
app.use('/admin', require('./routes/admin/admin.route'))
app.use('/admin/stations',  require('./routes/admin/stations'));
app.use('/admin/utilisateurs',  require('./routes/admin/utilisateurs'));

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


app.get('*', (req, res) => { res.redirect('/')})

module.exports = app;
