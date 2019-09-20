const db = require('../database/connection');
var SqlString = require('sqlstring');

const table = {
  name: 'stations',
  idStation: 'id_station',
  nomStation: 'nom_station',
  ville: 'ville',
  tel: 'tel',
  chefStation: 'chef_station',
  timestamp: 'timestamp'
}

module.exports = StationsDao = {

  addStation (Station) {

    let { nomStation, ville, tel, chefStation } = Station;

    const rq = `INSERT INTO ${table.name} 
    (${table.nomStation}, ${table.ville}, ${table.tel}, ${table.chefStation}, ${table.timestamp})
    values(?, ? , ? , ?, ?)`;

    const sql = SqlString.format(rq, [nomStation, ville, tel, chefStation, new Date().toISOString()]);

    return new Promise((resolve, reject) => {
      db.query(sql, (err, result) => {
        if (err) reject(err)
        else resolve(result)
      })
    })
  },

  updateStation (Station) {
    let { nomStation, ville, tel, chefStation } = Station;

    const rq = `update ${table.name} 
    set ${table.ville} = ? ,
        ${table.tel} = ?,
        ${table.chefStation} = ?
    where ${table.nomStation} = ? `;

    const sql = SqlString.format(rq, [ville, tel, chefStation, nomStation]);

    return new Promise((resolve, reject) => {
      db.query(sql, (err, result) => {
        if (err) reject(err)
        else resolve(result)
      })
    })
  },

  deletStation (nomStation) {
    const rq = `delete from ${table.name} where ${table.nomStation} = ?`;

    const sql = SqlString.format(rq, nomStation);

    return new Promise((resolve, reject) => {
      db.query(sql, (err, result) => {
        if (err) reject(err)
        else resolve(result)
      })
    })
  },

  getStation (nomStation) {
    const rq = `select * from ${table.name} where ${table.nomStation} = ? limit 1`;

    const sql = SqlString.format(rq, nomStation);

    return new Promise((resolve, reject) => {
      db.query(sql, (err, result) => {
        if (err) reject(err)
        else resolve(result)
      })
    })
  },

  getStations () {
    const sql = `select * from ${table.name} t join utilisateurs u
    on t.chef_station = u.id ORDER BY t.id_station DESC`;

    return new Promise((resolve, reject) => {
      db.query(sql, (err, result) => {
        if (err) reject(err)
        else resolve(result)
      })
    })

  }
}