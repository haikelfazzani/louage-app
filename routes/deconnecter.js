var router = require('express').Router()

module.exports = router.get('/', async (req, res) => {
  req.session.destroy();
  req.session = null;
  res.locals = null;
  await res.redirect("/login");
});