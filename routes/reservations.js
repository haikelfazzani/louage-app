var router = require('express').Router()
var { checkUserConnected } = require('../middleware/authorisation')

var reservDao = require('../dao/reservations.dao')
var Reservation = require('../model/Reservation')
var voyageDao = require('../dao/voyages.dao')

function checkValidParam (req, res, next) {
  try {
    let { voyage } = req.query;
    voyage = JSON.parse(decodeURIComponent(voyage))
    if (!voyage && Object.keys(voyage).length < 2) {
      res.redirect('/404')
    }
    next()
  } catch (error) {
    res.redirect('/404')
  }
}

router.get('/', checkValidParam, (req, res) => {

  let { voyage } = req.query;

  voyage = JSON.parse(decodeURIComponent(voyage))  

  voyageDao.nbPlacesByDestination(voyage.destination)
    .then(result => {
      res.render('reservations', { voyage, nbPlaces: result[0].nb })
    })
    .catch(error => {
      res.render('reservations')
    })

})

router.post('/ajout', (req, res) => {

  res.render('reservations')
})


router.get('/supprimer', checkUserConnected, function (req, res) {
  let { numserie } = req.query

  vehiculeDao.deletVehicule(numserie)
    .then(result => {
      res.redirect('/admin/vehicules')
    })
    .catch(error => {
      res.redirect('/admin/vehicules')
    })
});

module.exports = router