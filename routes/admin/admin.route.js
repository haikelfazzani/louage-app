var express = require('express');
var router = express.Router();
var { checkUserConnected } = require('../../middleware/authorisation')

var utilisateurDao = require('../../dao/utilisateurs.dao');
var stationDao = require('../../dao/stations.dao');
var voyageDao = require('../../dao/voyages.dao')
var reservDao = require('../../dao/reservations.dao')
var vehiculeDao = require('../../dao/vehicules.dao')

router.get('/', checkUserConnected, function (req, res) {

    let { id, email } = req.session.userInfo

    stationDao.getStationByChef(email)
        .then(resStation => {
            req.session.chefStationInfo = resStation[0]
            const promises = [
                utilisateurDao.getUsers(),
                stationDao.getStations(),
                voyageDao.getVoyageByNomStation(resStation[0].nom_station),
                reservDao.getAllReservationsByStation(resStation[0].id_station),
                vehiculeDao.getVehicules(id)
            ];

            Promise.all(promises).then(function (values) {
                let data = {
                    utilisateurs: values[0],
                    stations: values[1],
                    voyages: values[2],
                    reservations: values[3],
                    vehicules: values[4]
                }
                res.render('admin/index', { data });
            })
                .catch(error => {
                    res.render('admin/index');
                });
        })
        .catch(error => error)
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