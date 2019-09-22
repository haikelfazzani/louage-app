var router = require('express').Router()

router.get('/', (req, res) => {
  res.render('client/ticket')
})

module.exports = router