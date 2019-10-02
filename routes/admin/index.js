var express = require('express')
var router = express.Router()
var { checkUserConnected, checkAdminOrChef } = require('../../middleware/authorisation')

var utilisateurDao = require('../../dao/utilisateurs.dao')
var stationDao = require('../../dao/stations.dao')

router.get('/', [checkUserConnected, checkAdminOrChef], (req, res) => {

    let { email } = req.session.userInfo

    stationDao.getStationByChef(email)
        .then(resStation => {
            req.session.chefStationInfo = resStation[0]
            const promises = [utilisateurDao.getUsers(), stationDao.getStations()]

            Promise.all(promises)
                .then(function (values) {
                    let data = { utilisateurs: values[0], stations: values[1] }
                    res.render('admin/index', { data })
                })
                .catch(error => { res.render('admin/index') })
        })
        .catch(e => { res.redirect('/404') })
})

router.get('/utilisateurs.json', [checkUserConnected, checkAdminOrChef], (req, res) => {
    utilisateurDao.getUsers()
        .then(function (utilisateurs) {
            res.status(200).json(utilisateurs)
        })
        .catch(e => { res.status(404).json(utilisateurs) })
})

module.exports = router