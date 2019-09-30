module.exports = class ReservationModel {
  constructor (uidReservation, nbPlaceReserv, totalPrixPlaces, etatReservation, idClient, uidVoyage) {
    this.uidReservation = uidReservation || 0;
    this.nbPlaceReserv = nbPlaceReserv || 0;
    this.totalPrixPlaces = totalPrixPlaces || '';
    this.etatReservation = etatReservation || '';
    this.idClient = idClient || '';
    this.uidVoyage = uidVoyage || '';
  }
}