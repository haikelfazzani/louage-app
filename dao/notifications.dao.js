const db = require('../database/connection')
var knex = require('../database/knex')

const table = {
  name: 'notifications',
  id: 'id',
  sujet: 'sujet',
  message: 'message',
  nom_station: 'nom_station',
  timestamp: 'timestamp_notification',
  idUtilisateur: 'id_utilisateur'
}

module.exports = NotificationsDao = {

  addNotification (Notification) {
    let { sujet, message, nomStation, idUtilisateur } = Notification
    return knex(table.name).insert({
      sujet,
      message,
      nom_station: nomStation,
      id_utilisateur: idUtilisateur,
      timestamp_notification: new Date().toISOString()
    })
  },
  updateNotification (Notification, idNotif) {
    let { sujet, message } = Notification
    return knex(table.name).update({ sujet, message }).where(table.id, '=', idNotif)
  },
  deletNotification (idNotif) {
    return knex(table.name).where(table.id, '=', idNotif).del()
  },
  getNotifisById (id) {
    const rq = `SELECT * from ${table.name} WHERE ${table.id} = ${id} ORDER BY ${table.id} DESC`;

    return new Promise((resolve, reject) => {
      db.query(rq, (err, result) => {
        if (err) reject(err)
        else resolve(result)
      })
    })
  },
  getNotifisByChefStation (idUtilisateur) {
    const rq = `SELECT * from ${table.name} WHERE id_utilisateur = ${idUtilisateur} ORDER BY id DESC`;

    return new Promise((resolve, reject) => {
      db.query(rq, (err, result) => {
        if (err) reject(err)
        else resolve(result)
      })
    })
  },
  getNotifications () {
    const rq = `SELECT * from ${table.name} t 
    JOIN utilisateurs u ON t.id_utilisateur = u.id ORDER BY t.id DESC`;

    return new Promise((resolve, reject) => {
      db.query(rq, (err, result) => {
        if (err) reject(err)
        else resolve(result)
      })
    })
  }
}