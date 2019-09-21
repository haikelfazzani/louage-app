var router = require('express').Router();

var knex = require('../database/knex')

const bcrypt = require('bcrypt');
const saltRounds = 10;

router.get('/', function (req, res) {
  res.render('register')
});

router.post('/', function (req, res) {

  let { email, password } = req.body;

  bcrypt.hash(password, saltRounds)
    .then(function (hash) {

      knex('utilisateurs').insert({ email, password: hash, role: 'client' })
        .then(result => {
          res.render('register', { msg: 'vous êtes maintenant inscrit' })
        })
        .catch(error => {
          res.render('register', { msg: 'vous êtes deja inscrit!' })
        })
    })
    .catch(errHash => { res.render('error', { appErrors: errHash }) });

});

module.exports = router;