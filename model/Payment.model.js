module.exports = class ReservationModel {
  constructor (datePayment, idReservation, idClient) {
    this.datePayment = datePayment || '';
    this.idReservation = idReservation || '';
    this.idClient = idClient || '';
  }
}