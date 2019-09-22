const db = require('../database/connection');
var SqlString = require('sqlstring');
var knex = require('../database/knex')

const table = {
  name: 'payments',
  idPayment: 'id_payment',
  idReserv: 'id_reservation',
  idClient: 'id_client',
  timestamp: 'timestamp_payment'
}

module.exports = PaymentsDao = {

  addPayment (Payment) {

    let { idReserv, idClient } = Payment;

    const rq = `INSERT INTO ${table.name} 
    (${table.idReserv}, ${table.idClient}, ${table.timestamp}) 
    values(? , ? , ?)`;

    const sql = SqlString.format(rq, [ idReserv, idClient, new Date().toISOString()]);

    return new Promise((resolve, reject) => {
      db.query(sql, (err, result) => {
        if (err) reject(err)
        else resolve(result)
      })
    })
  },

  cancelPayment() {

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

  getPayments () {
    const sql = `select * from ${table.name}`;

    return new Promise((resolve, reject) => {
      db.query(sql, (err, result) => {
        if (err) reject(err)
        else resolve(result)
      })
    })
  }
}