module.exports = class VehiculeModel {
    constructor (numSerie, proprietaire, nbPlaces) {
        this.numSerie = numSerie || '';
        this.proprietaire = proprietaire || '';
        this.nbPlaces = nbPlaces || '';
    }
}