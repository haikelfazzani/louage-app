module.exports = class Voayge {
  constructor (uidVoyage, destination, heureDepart, dateDepart, prixPlace, nbPlaces, idStation, numSerieVehicule) {
    this.uidVoyage = uidVoyage || ''
    this.destination = destination || ''
    this.heureDepart = heureDepart || ''
    this.dateDepart = dateDepart || ''
    this.prixPlace = prixPlace || ''
    this.nbPlaces = nbPlaces || ''
    this.idStation = idStation || ''
    this.numSerieVehicule = numSerieVehicule || ''
  }
}