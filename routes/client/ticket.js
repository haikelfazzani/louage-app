var router = require('express').Router()
var { checkUserConnected, checkIsClient } = require('../../middleware/authorisation')
var voyageDao = require('../../dao/voyages.dao')

router.get('/', [checkUserConnected, checkIsClient], (req, res) => {
  let { nom, prenom, email } = req.session.userInfo
  let paymentInfo = JSON.parse(req.cookies.payment)

  voyageDao.geFulltVoyageById(paymentInfo.uidvoyage)
    .then(voyages => {
      res.render('client/ticket', { paymentInfo, email, voyage: voyages[0], nom, prenom })
    })
    .catch(e => {
      res.redirect('/404')
    })
})
module.exports = router