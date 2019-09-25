const db = require('../database/connection')
var knex = require('../database/knex')
var SqlString = require('sqlstring');

const table = {
  name: 'vehicules',
  idVehicule: 'id_vehicule',
  proprietaire: 'proprietaire',
  numSerie: 'num_serie',
  nbPlaces: 'nb_places',
  tel: "tel",
  idStation: 'id_station', // clé étrangaire
  timestamp: 'timestamp_vehicule'
}

module.exports = VehiculesDao = {

  addVehicule (Vehicule) {
    let { proprietaire, numSerie, nbPlaces, tel, idStation } = Vehicule;
    return knex(table.name).insert({
      proprietaire,
      num_serie: numSerie,
      nb_places: nbPlaces,
      tel,
      id_station: idStation,
      timestamp_vehicule: new Date().toISOString()
    })
  },

  updateVehicule (Vehicule, idVehicule) {
    let { proprietaire, numSerie, nbPlaces, tel } = Vehicule;
    return knex(table.name).update({ proprietaire, num_serie: numSerie, nb_places: nbPlaces, tel })
      .where(table.idVehicule, '=', idVehicule)
  },

  deletVehicule (numSerie) {
    return knex(table.name).where(table.numSerie, numSerie).del()
  },

  getVehicule (numSerie) {
    const rq = `select * from ${table.name} v
    join stations s on v.id_station = s.id_station where v.num_serie = ?`;

    const sql = SqlString.format(rq, numSerie);

    return new Promise((resolve, reject) => {
      db.query(sql, (err, result) => {
        if (err) reject(err)
        else resolve(result)
      })
    })
  },

  getVehicules (chefStation) {
    const rq = `select * from ${table.name} t join stations s 
    on t.id_station = s.id_station WHERE s.chef_station = ?`;

    const sql = SqlString.format(rq, chefStation)

    return new Promise((resolve, reject) => {
      db.query(sql, (err, result) => {
        if (err) reject(err)
        else resolve(result)
      })
    })
  }
}