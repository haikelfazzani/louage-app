module.exports = class ReservationModel {

  constructor (nbPlaceReserv, totalPrixPlaces, etatReservation, idClient, idVoyage) {
    this.nbPlaceReserv = nbPlaceReserv || 0;
    this.totalPrixPlaces = totalPrixPlaces || '';
    this.etatReservation = etatReservation || '';
    this.etatReservation = etatReservation || '';
    this.idClient = idClient || '';
    this.idVoyage = idVoyage || '';
  }
}