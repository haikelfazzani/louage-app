module.exports = class Notification {
  constructor (sujet, message, nomStation, idUtilisateur) {
    this.sujet = sujet
    this.message = message
    this.nomStation = nomStation
    this.idUtilisateur = idUtilisateur
  }
}