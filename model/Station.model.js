module.exports = class StationModel {
  constructor (nomStation, ville, tel, chefStation) {
    this.nomStation = nomStation || '';
    this.ville = ville || '';
    this.tel = tel || '';
    this.chefStation = chefStation || '';
  }
}