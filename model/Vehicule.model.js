module.exports = class VehiculeModel {

    constructor (proprietaire, numSerie, nbPlaces, tel, idStation) {
        this.proprietaire = proprietaire || '';
        this.numSerie = numSerie || '';
        this.nbPlaces = nbPlaces || '';
        this.tel = tel || '';
        this.idStation = idStation || '';
    }
}