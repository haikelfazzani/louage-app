router = require('express').Router()

module.exports = router.get('/', async (req, res) => {
  await res.render('apropos')
})