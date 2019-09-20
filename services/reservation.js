let reservDao = require('../dao/reservations.dao')
let EtatReservation = require('../model/EtatReservation.enum')

// check reservation time + 10 min : recursive -> 2019-09-20T13:13:52.977Z
module.exports = (function () {
  reservDao.getAllReservations()
    .then(result => {

      result.forEach(element => {

        let checkTime = Date.parse(new Date()) > (Date.parse(element.timestamp) + 600000)

        console.log(Date.parse(new Date()) - (Date.parse(element.timestamp) + 600000));
        console.log(checkTime);
        

        if(checkTime && element.etat_reservation === EtatReservation.enAttente) {
          // reservDao.deleteReservByEtat()
          // .then(resultEtat => {
          //   console.log(resultEtat)
          // })
          // .catch(error => {
          //   console.log(errorEtat)
          // })
        }        
      });
    })
    .then(error => {
      //console.error(error)
    })
})();