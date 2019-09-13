module.exports = class UtilisateurModel {

  constructor (nom, prenom, email, password, avatar, role) {
    this.nom = nom || '';
    this.prenom = prenom || '';
    this.email = email || '';
    this.password = password || '';
    this.avatar = avatar || '';
    this.role = role || '';
  }
}