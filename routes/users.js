var express = require('express');
var router = express.Router();

const UtilisateurDao = require('../dao/utilisateurs.dao');

/* GET users listing. */
router.get('/', function(req, res, next) {

  UtilisateurDao.getUsers()
  .then(result => console.log(result))
  .catch(err => console.log(err))

  res.send('respond with a resource');
});

module.exports = router;
