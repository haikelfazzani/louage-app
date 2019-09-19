var express = require('express');
var router = express.Router();
var { checkUserConnected } = require('../../middleware/authorisation')

var utilisateurDao = require('../../dao/utilisateurs.dao');
var stationDao = require('../../dao/stations.dao');
var vehiculesDao = require('../../dao/vehicules.dao')
var voyageDao = require('../../dao/voyages.dao')

router.get('/', checkUserConnected, function (req, res) {

    const promises = [
        utilisateurDao.getUsers(),
        stationDao.getStations(),
        utilisateurDao.getUserByRole('chef_station'),
        vehiculesDao.getVehicules(),
        voyageDao.getVoyages()
    ];

    Promise.all(promises).then(function (values) {
        let data = {
            utilisateurs: values[0],
            stations: values[1],
            chefStations: values[2],
            vehicules: values[3],
            voyages: values[4]
        };
        res.render('admin/index', { data });
    })
        .catch(error => {
            res.render('admin/index');
        });

});

module.exports = router;