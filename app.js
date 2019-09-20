var createError = require('http-errors');
var express = require('express');
var path = require('path');
//var logger = require('morgan');
var nodeFileEnv = require('node-file-env');
var session = require('express-session')

var app = express()

app.use(session({
  secret: 'my-secret-code',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false, maxAge: 3600000 }
}))

app.use(function (req, res, next) {
  if (req.session.userInfo) {
    res.locals.userInfo = req.session.userInfo
    res.locals.avatar = req.session.avatar
  }

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

app.get('/test', (req, res) => {
  res.render('test')
})

app.get('/404', (req, res) => {
  res.render('404')
})

// load env variables
nodeFileEnv().load()

// routers
app.use('/', require('./routes/index'));
app.use('/login', require('./routes/login'));
app.use('/register', require('./routes/register'));
app.use('/se-deconnecter', require('./routes/deconnecter'));

app.use('/utilisateur', require('./routes/client/profile'));
app.use('/voyages', require('./routes/client/voyages'));
app.use('/reservations', require('./routes/client/reservations'));
app.use('/payments', require('./routes/client/payments'));

// admin routes
app.use('/admin', require('./routes/admin/admin.route'))
app.use('/admin/stations', require('./routes/admin/stations'));
app.use('/admin/utilisateurs', require('./routes/admin/utilisateurs'));

app.use('/admin/vehicules', require('./routes/chefstation/vehicules'));
app.use('/admin/voyages', require('./routes/chefstation/voyages'));

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
