module.exports = class Voayge {
  constructor (
    uidVoyage, 
    arrive,
    heureDepart, 
    dateDepart, 
    prixPlace,
    nbPlaces, 
    idStation, 
    numSerieVehicule
  ) {
    this.uidVoyage = uidVoyage || ''
    this.arrive = arrive || ''
    this.heureDepart = heureDepart || ''
    this.dateDepart = dateDepart || ''
    this.prixPlace = prixPlace || ''
    this.nbPlaces = nbPlaces || ''
    this.idStation = idStation || ''
    this.numSerieVehicule = numSerieVehicule || ''
  }
}