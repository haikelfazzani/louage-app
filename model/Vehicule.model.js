module.exports = class VehiculeModel {

    constructor (conducteur, destination, nbrPlace, heurDepart, dateDepart, prixPalce, idStation) {
        this.conducteur = conducteur || '';
        this.destination = destination || '';
        this.nbrPlace = nbrPlace || '';
        this.heurDepart = heurDepart || '';
        this.dateDepart = dateDepart || '';
        this.prixPalce = prixPalce || '';
        this.idStation = idStation || '';
    }
}