const db = require('../database/connection');
var SqlString = require('sqlstring');

const table = {
  name: 'payments',
  idPayment: 'id_payment',
  datePayment: 'date_payment',
  idReserv: 'id_reservation',
  idClient: 'id_client',
  timestamp: 'timestamp'
}

module.exports = PaymentsDao = {

  addPayment (Payment) {

    let { datePayment, idReserv, idClient } = Payment;

    const rq = `INSERT INTO ${table.name} 
    (${table.datePayment}, ${table.idReserv}, ${table.idClient}, ${table.timestamp}) 
    values(?, ? , ? , ?)`;

    const sql = SqlString.format(rq, [datePayment, idReserv, idClient, new Date().toString()]);

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

  getPayments () {
    const sql = `select * from ${table.name} t join utilisateurs u
    on t.id_client = u.id ORDER BY t.id_reservation DESC`;

    return new Promise((resolve, reject) => {
      db.query(sql, (err, result) => {
        if (err) reject(err)
        else resolve(result)
      })
    })

  }
}