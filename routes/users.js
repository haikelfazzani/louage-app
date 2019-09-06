var express = require('express');
var router = express.Router();

const UserModel = require('../model/Utilisateur.model');
const UtilisateurDao = require('../dao/utilisateurs.dao');

/* GET users listing. */
router.get('/', function (req, res, next) {

  UtilisateurDao.getUsers()
    .then(result => {
      res.json(result);
    })
    .catch(err => console.log(err))
});

router.get('/add', (req, res) => {

  let User = new UserModel('haikel@gmail.com', '123', '', 'client');
  UtilisateurDao.addUser(User)
    .then(result => console.log(result))
    .catch(err => console.log(err))

  res.json(User)
})

module.exports = router;
