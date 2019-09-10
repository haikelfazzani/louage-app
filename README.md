![Class Diagram](https://i.ibb.co/sC4tjX4/classe.png)  

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
- [ ] Ajout véhilcule
- [ ] supprimer véhilcule
- [ ] modifier véhilcule
- [ ] lister véhilcule

## Gestion des reservations (client)
- [ ] effectuer une reservation
- [ ] annuler une reservation

## Gestion des payments (client)
- [ ] effectuer un payment
- [ ] annuler un payment

> *Export ticket into PDF* and *Notify user payment*.

## Aditional fonctionnality (Admin, client et chef station)
- [x] utilisateur peut cree un compte
- [x] utilisateur peut se connecter à son compte
- [x] utilisateur consulter son compte
- [x] utilisateur peut modifier son compte
- [ ] utilisateur peut supprimer son compte

## Database
- [x] **utilisateurs** (id, email, password, avatar,tel, role)
- [x] **stations** (id_station, nom_station, ville, #id_utilisateur)
- [ ] **vehicules** (id_vehicule, num_serie, destination, nb_places, h_depart, d_depart, prix_place, tel, #id_station)
- [ ] **reservations** (nb_place_reserv, #id_utilisateur, #vehicule)
- [ ] **payments** (id_payment, nom, prenom, tel, dc_payment, #reservation)

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

## Notes
- h_depart -> heure de depart
- d_depart -> date de depart
- dc_payment -> date complet de payment (2019:06:06T10:25:40)

## Bugs
- [x] Database Connection lost: The server closed the connection. (Fixed)