module.exports = class ReservationModel {
  constructor (numCarte, idReservation, idClient) {
    this.numCarte = numCarte || '';
    this.idReservation = idReservation || '';
    this.idClient = idClient || '';
  }
}