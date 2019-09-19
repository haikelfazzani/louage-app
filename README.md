## Gestion des utilisateurs (admin)
- [x] Ajout utlisateur
- [x] supprimer un utlisateur
- [x] lister des utlisateurs

## Gestion des stations (admin)
- [x] Ajout station
- [x] supprimer station
- [x] modifier station
- [x] lister station

## Gestion des véhilcules (chef stations)
- [x] Ajout véhilcule
- [x] supprimer véhilcule
- [x] modifier véhilcule
- [x] lister véhilcule

## Gestion des voyages (chef station)
- [x] plannification d'un voyage
- [ ] supprimer un voyage
- [ ] modifier un voyage
- [ ] consuler la liste des voyages (client + chef station)

## Gestion des reservations (client)
- [ ] confirmer une reservation
- [ ] annuler une reservation
*reservation en etat d'attente sera anunler auto aprés 10min*

## Gestion des payments (client)
- [ ] effectuer un payment
- [ ] annuler un payment

> *Export ticket into PDF* and *Notify user payment*.

## Aditional fonctionnality (Admin, client et chef station)
- [x] utilisateur peut cree un compte
- [x] utilisateur peut se connecter à son compte
- [x] utilisateur consulter son compte

- [x] utilisateur peut modifier ses infos de son compte

- [x] utilisateur peut modifier son mot de passe
- [x] utilisateur peut modifier son avatar

- [x] utilisateur peut supprimer son compte

## Database
- [x] **utilisateurs** (id, nom, prenom, email, password, tel, avatar, role)
- [x] **stations** (id_station,	nom_station,	ville,	tel,	#chef_station)
- [x] **vehicules** (id_vehicule,	propotaire,	nb_places,tel,#id_station)
- [x] **voyages** (id_voyage, destination, heure_depart, date_depart, prix_place, nb_places_restes, #id_client)
- [x] **reservations** (id_reservation, nb_place_reserver, total_prix_places, etat_reservation,  #id_utilisateur, #id_voyage)
- [x] **payments** (id_payment, date_payment, #id_reservation,	#id_client)

## Performance
- [ ] fork app process into workers. (Clustering)
- [ ] Hot reload and redirect errors. (App never crash)

## Security
- [ ] JWT Auth
- [ ] CORS
- [ ] Password attack (hashing)
- [ ] ClickJacking attack
- [ ] DDOS attack
- [ ] DOS attack
- [ ] CSRF attack
- [ ] XSS attack

## Additional
- [ ] visitor reporting. (Charting)
- [ ] Facebook login
- [ ] Google login
- [ ] Google maps station position

## Notes
- h_depart -> heure de depart
- d_depart -> date de depart
- dc_payment -> date complet de payment (2019:06:06T10:25:40)

## Bugs
- [x] Database Connection lost: The server closed the connection. (Fixed)

## Tests
