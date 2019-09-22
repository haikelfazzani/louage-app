const db = require('../database/connection');
var SqlString = require('sqlstring');
var knex = require('../database/knex')

const table = {
  name: 'payments',
  idPayment: 'id_payment',
  numCarte: 'num_carte',
  idReserv: 'id_reservation',
  idClient: 'id_client',
  timestamp: 'timestamp_payment'
}

module.exports = PaymentsDao = {

  addPayment (Payment) {

    let { numCarte, idReservation, idClient } = Payment;

    const rq = `INSERT INTO ${table.name} 
    (${table.numCarte}, ${table.idReserv}, ${table.idClient}, ${table.timestamp}) 
    values(? , ? , ?, ?)`;

    const sql = SqlString.format(rq, [numCarte, idReservation, idClient, new Date().toISOString()]);

    return new Promise((resolve, reject) => {
      db.query(sql, (err, result) => {
        if (err) reject(err)
        else resolve(result)
      })
    })
  },

  cancelPayment () {

  },

  getPaymentsByUser (email) {
    const sql = `select * from ${table.name} t join utilisateurs u
    on t.id_client = u.id 
    WHERE u.email = ? ORDER BY t.id_reservation DESC`;

    const sql = SqlString.format(rq, email);

    return new Promise((resolve, reject) => {
      db.query(sql, (err, result) => {
        if (err) reject(err)
        else resolve(result)
      })
    })
  },

  getPayments (idUser) {
    const rq = `select * from ${table.name} p
    join reservations r on p.id_reservation = r.id_reservation
    join voyages v on r.id_voyage = v.id_voyage
    join stations s on s.id_station = v.id_station
    where p.id_client = ? ORDER BY p.id_payment`;

    const sql = SqlString.format(rq, [idUser])

    return new Promise((resolve, reject) => {
      db.query(sql, (err, result) => {
        if (err) reject(err)
        else resolve(result)
      })
    })
  }
}