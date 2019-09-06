var router = require('express').Router();

router.get('/', function (req, res, next) {

  res.render('login')
});


router.post('/', function (req, res, next) {

  res.redirect('/')
});


module.exports = router;