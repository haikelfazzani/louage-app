var router = require('express').Router();

router.get('/', function (req, res) {

  res.render('login')
});


router.post('/', function (req, res) {

  res.redirect('/')
});


module.exports = router;