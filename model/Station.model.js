module.exports = class StationModel {
  constructor (nomStation, ville, tel, chefStation) {
    this.nomStation = nomStation.toLowerCase() || '';
    this.ville = ville.toLowerCase() || '';
    this.tel = tel || '';
    this.chefStation = chefStation || '';
  }
}