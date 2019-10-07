var express = require('express')
var router = express.Router()
var stationDao = require('../dao/stations.dao')

router.get('/', function (req, res) {
  stationDao.getStations()
    .then(stations => {    
      res.render('index', { stations })
    })
    .catch(e => {
      res.render('index')
    })
})
module.exports = router