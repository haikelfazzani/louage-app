var db = require('../database/connection')
var knex = require('../database/knex')
var SqlString = require('sqlstring');

const table = {
  name: 'stations',
  idStation: 'id_station',
  nomStation: 'nom_station',
  ville: 'ville',
  tel: 'station_tel',
  chefStation: 'chef_station',
  timestamp: 'timestamp_station'
}

module.exports = StationsDao = {

  addStation (Station) {

    let { nomStation, ville, tel, chefStation } = Station

    return knex(table.name).insert({
      nom_station: nomStation,
      ville,
      station_tel: tel,
      chef_station: chefStation,
      timestamp_station: new Date().toISOString()
    })
  },

  updateStation (Station, idStation) {
    let { nomStation, ville, tel } = Station

    return knex(table.name).update({ nom_station: nomStation, ville, station_tel: tel })
      .where(table.idStation, '=', idStation)
  },

  deletStation (nomStation) {
    return knex(table.name).where(table.nomStation, '=', nomStation).del()
  },

  getStation (nomStation) {
    const rq = `select * from ${table.name} s join utilisateurs u
    on s.chef_station = u.id where s.nom_station = ?`;

    const sql = SqlString.format(rq, nomStation);

    return new Promise((resolve, reject) => {
      db.query(sql, (err, result) => {
        if (err) reject(err)
        else resolve(result)
      })
    })
  },

  getStationByChef (email) {
    const rq = `select * from stations s join utilisateurs u
    on s.chef_station = u.id where u.email = ?`;

    const sql = SqlString.format(rq, email);

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
  },
  getAllStations () {
    const sql = `select * from ${table.name} ORDER BY ${table.idStation} DESC`;

    return new Promise((resolve, reject) => {
      db.query(sql, (err, result) => {
        if (err) reject(err)
        else resolve(result)
      })
    })
  }
}