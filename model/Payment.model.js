module.exports = class ReservationModel {
  constructor (uidPayment, numCarte, uidReservation) {
    this.uidPayment = uidPayment || '';
    this.numCarte = numCarte || '';
    this.uidReservation = uidReservation || '';
  }
}