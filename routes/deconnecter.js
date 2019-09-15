var router = require('express').Router()

router.get('/', async (req, res) => {
  req.session.destroy();
  req.session = null;
  res.locals = null;
  await res.redirect("/login");
});

module.exports = router;