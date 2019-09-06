module.exports = class UtilisateurModel {

  constructor (email, password, avatar, role) {
    this.email = email || '';
    this.password = password || '';
    this.avatar = avatar || '';
    this.role = role || '';
  }

}