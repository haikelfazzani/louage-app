var router = require('express').Router()

router.get('/', (req, res) => {
  res.render('apropos')
})

module.exports = router