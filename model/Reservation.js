module.exports = class ReservationModel {

  constructor (nbPlaceReserv, totalPrixPlaces, etatReservation, idUtilisateur, idVoyage) {
    this.nbPlaceReserv = nbPlaceReserv || 0;
    this.totalPrixPlaces = totalPrixPlaces || '';
    this.etatReservation = etatReservation || '';
    this.etatReservation = etatReservation || '';
    this.idUtilisateur = idUtilisateur || '';
    this.idVoyage = idVoyage || '';
  }
}