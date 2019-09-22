var router = require('express').Router()
var voyageDao = require('../../dao/voyages.dao')

router.get('/', (req, res) => {
  let { email } = req.session.userInfo
  let paymentInfo = JSON.parse(req.cookies.payment)
  
  voyageDao.getVoyageById(paymentInfo.idvoyage)
    .then(voyages => {      
      res.render('client/ticket', { paymentInfo, email,voyage:voyages[0] })
    })
    .catch(error => {
      res.render('client/ticket', { paymentInfo, email })
    })
})

module.exports = router