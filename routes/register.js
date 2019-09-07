var router = require('express').Router();

router.get('/', function (req, res) {

  res.render('register')
});


router.post('/', function (req, res) {

  res.redirect('/')
});


module.exports = router;