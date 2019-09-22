const db = require('../database/connection');
var SqlString = require('sqlstring');
var knex = require('../database/knex')

const table = {
  name: 'payments',
  uidPayment: 'uid_payment',
  numCarte: 'num_carte',
  uidReserv: 'uid_reservation',
  idClient: 'id_client',
  timestamp: 'timestamp_payment'
}

module.exports = PaymentsDao = {

  addPayment (Payment) {

    let { uidPayment, numCarte, uidReservation, idClient } = Payment;

    return knex(table.name)
      .insert({
        uid_payment: uidPayment,
        num_carte: numCarte,
        uid_reservation: uidReservation,
        id_client: idClient,
        timestamp_payment: new Date().toISOString()
      })
  },

  cancelPayment (uidPayment) {
    let rq = `DELETE FROM ${table.name} WHERE ${table.uidPayment} = ?`;

    const sql = SqlString.format(rq, uidPayment);

    return new Promise((resolve, reject) => {
      db.query(sql, (err, result) => {
        if (err) reject(err)
        else resolve(result)
      })
    })
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
    join reservations r on p.uid_reservation = r.uid_reservation
    join voyages v on r.id_voyage = v.id_voyage
    join stations s on s.id_station = v.id_station
    where p.id_client = ? 
    ORDER BY p.id_payment DESC LIMIT 1`;

    const sql = SqlString.format(rq, [idUser])

    return new Promise((resolve, reject) => {
      db.query(sql, (err, result) => {
        if (err) reject(err)
        else resolve(result)
      })
    })
  }
}