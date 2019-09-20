let reservDao = require('../dao/reservations.dao')
let EtatReservation = require('../model/EtatReservation.enum')

// check reservation time + 5 min : recursive -> 2019-09-20T13:13:52.977Z
module.exports = (function () {
  reservDao.getAllReservations()
    .then(result => {

      result.forEach(element => {

        let checkTime = Date.parse(new Date()) > Date.parse(element.timestamp) + (1000 * 60 * 5)

        if(element.etat_reservation === EtatReservation.enAttente && checkTime) {
          reservDao.updateEtatReserv('annuler', element.id_reservation)
          .then(resultEtat => {
            //console.log(resultEtat)
          })
          .catch(error => {
            //console.log(errorEtat)
          })
        }        
      });
    })
    .then(error => {
      //console.error(error)
    })
})();