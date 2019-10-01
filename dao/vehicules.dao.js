var knex = require('../database/knex')
// const db = require('../database/connection')
// var SqlString = require('sqlstring')

const table = {
  name: 'vehicules',
  numSerie: 'num_serie',
  proprietaire: 'proprietaire',
  nbPlaces: 'nb_places_v',
  timestamp: 'timestamp_vehicule',
}

module.exports = VehiculesDao = {

  addVehicule (Vehicule) {
    let { numSerie, proprietaire, nbPlaces } = Vehicule
    return knex(table.name).insert({
      num_serie: numSerie,
      proprietaire,
      nb_places_v: nbPlaces,
      timestamp_vehicule: new Date().toISOString()
    })
  },
  updateVehicule (Vehicule) {
    let { numSerie, proprietaire, nbPlaces } = Vehicule;
    return knex(table.name).update({ proprietaire, nb_places_v: nbPlaces })
      .where(table.numSerie, '=', numSerie)
  },
  deletVehicule (numSerie) {
    return knex(table.name).where(table.numSerie, '=', numSerie).del()
  },
  getVehicule (numSerie) {
    return knex(table.name).where(table.numSerie, '=', numSerie).first()
  },
  getVehicules () {
    return knex(table.name).select()
  }
}