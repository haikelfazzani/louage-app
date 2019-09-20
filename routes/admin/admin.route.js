var express = require('express');
var router = express.Router();
var { checkUserConnected } = require('../../middleware/authorisation')

var utilisateurDao = require('../../dao/utilisateurs.dao');
var stationDao = require('../../dao/stations.dao');
var voyageDao = require('../../dao/voyages.dao')
var reservDao = require('../../dao/reservations.dao')

router.get('/', checkUserConnected, function (req, res) {

    const promises = [
        utilisateurDao.getUsers(),
        stationDao.getStations(),
        voyageDao.getVoyages(),
        reservDao.getAllReservations()
    ];

    Promise.all(promises).then(function (values) {
        let data = {
            utilisateurs: values[0],
            stations: values[1],
            voyages: values[2],
            reservations: values[3]
        };
        res.render('admin/index', { data });
    })
        .catch(error => {
            res.render('admin/index');
        });

});

module.exports = router;