var express = require('express');
var router = express.Router();

var utilisateurDao = require('../../dao/utilisateurs.dao');
var stationDao = require('../../dao/stations.dao');

router.get('/', function (req, res) {

  const promises = [
    utilisateurDao.getUsers(),
    stationDao.getStations(),
    utilisateurDao.getUserByRole('chef_station')
  ];

  Promise.all(promises).then(function (values) {
    let data = {
      utilisateurs: values[0],
      stations: values[1],
      chefStations: values[2]
    };

    res.render('admin/index', data);
  })
    .catch(error => {
      res.render('admin/index');
    });

});

module.exports = router;