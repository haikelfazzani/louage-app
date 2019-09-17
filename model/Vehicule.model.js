module.exports = class VehiculeModel {

    constructor (proprietaire, nbPlaces, tel, idStation) {
        this.proprietaire = proprietaire || '';
        this.nbPlaces = nbPlaces || '';
        this.tel = tel || '';
        this.idStation = idStation || '';
    }
}