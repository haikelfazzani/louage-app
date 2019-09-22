var router = require('express').Router()
var { checkUserConnected } = require('../../middleware/authorisation')

var reservDao = require('../../dao/reservations.dao')
var paymentDao = require('../../dao/payments.dao')

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

router.get('/', [checkUserConnected], (req, res) => {

  let { id_reservation } = req.body
  let {email}=req.session.userInfo

  //console.log('Cookies: ', req.cookies);

  reservDao.getReservByUser(email)
  .then(reservs => {
    console.log(reservs)
    res.render('client/payments', { reservation: reservs[0] })
  })
  .catch(error => {
    res.render('client/payments', { reservation: id_reservation })
  })  
})

router.post('/ajout', checkUserConnected, (req, res) => {
  let { nbplaces, total, idvoyage, nbplacesv } = req.body
  let { id } = req.session.userInfo;

  let reserv = new Reservation(+nbplaces, total, 'en attente', id, idvoyage)

  Promise.all([
    reservDao.addReservation(reserv),
    voyageDao.updateNbPlaces(+(nbplacesv - nbplaces), idvoyage)
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