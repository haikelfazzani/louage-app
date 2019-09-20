var router = require('express').Router()
var { checkUserConnected } = require('../../middleware/authorisation')

var reservDao = require('../../dao/reservations.dao')
var Reservation = require('../../model/Reservation')
var voyageDao = require('../../dao/voyages.dao')
var EtatReser = require('../../model/EtatReservation.enum')

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

router.get('/', [checkUserConnected, checkValidParam], (req, res) => {

  let { voyage } = req.query;

  voyage = JSON.parse(decodeURIComponent(voyage))

  voyageDao.nbPlacesByDestination(voyage.destination)
    .then(result => {
      if(result[0].nb < 1) {
        res.redirect('/')
      }
      res.render('client/reservations', { voyage, nbPlaces: result[0].nb })
    })
    .catch(error => {
      res.render('client/reservations')
    })

})

router.post('/ajout', checkUserConnected , (req, res) => {
  let { nbplaces, total, idvoyage, nbplacesv } = req.body
  let { id } = req.session.userInfo;

  let reserv = new Reservation(+nbplaces, total, EtatReser.enAttente, id, idvoyage)

  Promise.all([
    reservDao.addReservation(reserv),
    voyageDao.updateNbPlaces(+(nbplacesv-nbplaces), idvoyage)
  ])
    .then(result => {
      res.render('client/payments')
    })
    .catch(error => {
      res.render('client/payments')
    })
})


router.get('/annuler', checkUserConnected, function (req, res) {
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