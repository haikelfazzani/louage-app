var router = require('express').Router()

var stationDao = require('../dao/stations.dao')
var voyagesDao = require('../dao/voyages.dao')
var Voyage = require('../model/Voyage.model')

router.post('/', (req, res) => {
  let { nomstation } = req.body

  voyagesDao.getVoyageByNomStation(nomstation)
    .then(voyages => {
      res.render('voyages',{voyages})
    })
    .catch(error => {
      res.render('voyages')
    })
})

module.exports = router