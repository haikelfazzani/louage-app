var express = require('express');
var router = express.Router();
var { checkUserConnected } = require('../../middleware/authorisation')

var utilisateurDao = require('../../dao/utilisateurs.dao');
var stationDao = require('../../dao/stations.dao');
var voyageDao = require('../../dao/voyages.dao')
var reservDao = require('../../dao/reservations.dao')

router.get('/', checkUserConnected, function (req, res) {

    let { email } = req.session.userInfo

    stationDao.getStationByChef(email)
        .then(resStation => {
            req.session.chefStationInfo = resStation[0]
        })
        .catch(error => error)

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

router.get('/voyages.json', checkUserConnected, function (req, res) {

    let { nom_station } = req.session.chefStationInfo

    voyageDao.getVoyageByNomStation(nom_station)
        .then(function (voyages) {
            res.status(200).json(voyages);
        })
        .catch(error => {
            res.status(404).json(voyages);
        });
});

router.get('/utilisateurs.json', checkUserConnected, function (req, res) {

    utilisateurDao.getUsers()
        .then(function (utilisateurs) {
            res.status(200).json(utilisateurs);
        })
        .catch(error => {
            res.status(404).json(utilisateurs);
        });
});

module.exports = router;