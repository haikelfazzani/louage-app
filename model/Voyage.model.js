module.exports = class Voayge {

  constructor (destination, heureDepart, dateDepart, prixPlace, nbPlaces, idStation) {
    this.destination = destination || ''
    this.heureDepart = heureDepart || ''
    this.dateDepart = dateDepart || ''
    this.prixPlace = prixPlace || ''
    this.nbPlaces = nbPlaces || ''
    this.idStation = idStation || ''
  }
}