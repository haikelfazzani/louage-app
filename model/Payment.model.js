module.exports = class ReservationModel {
  constructor (uidPayment, numCarte, uidReservation, idClient) {
    this.uidPayment = uidPayment || '';
    this.numCarte = numCarte || '';
    this.uidReservation = uidReservation || '';
    this.idClient = idClient || '';
  }
}