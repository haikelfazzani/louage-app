var router = require('express').Router()
var voyagesDao = require('../../dao/voyages.dao')

router.post('/', (req, res) => {
  
  let { nomstation } = req.body

  voyagesDao.getVoyageByNomStation(nomstation)
    .then(voyages => {
      voyages = voyages.filter(v => v.nb_places > 0 && v.date_depart >= new Date().toJSON().slice(0,10))
      res.render('client/voyages', { voyages })
    })
    .catch(error => {
      res.render('client/voyages')
    })
})

module.exports = router