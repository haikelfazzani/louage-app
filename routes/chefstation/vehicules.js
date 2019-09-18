var router = require('express').Router()
var vehiculeDao = require('../../dao/vehicules.dao')
var { checkUserConnected } = require('../../middleware/authorisation')

router.get('/', checkUserConnected, (req, res) => {
  vehiculeDao.getVehicules()
    .then(vehicules => {
      res.render('admin/vehicule/lister', { vehicules })
    })
    .catch(error => {
      res.render('admin/vehicule/lister')
    })
})


router.get('/ajout', checkUserConnected, (req, res) => {
  res.render('admin/vehicule/ajout')
})

module.exports = router