var router = require('express').Router();

router.get('/', function (req, res, next) {

  res.render('login')
});


router.post('/', function (req, res, next) {

  res.redirect('/')
});



process.env.bilel

module.exports = router;