![Class Diagram](https://i.ibb.co/BGXLm6s/classe.png)  

## Gestion des utilisateurs (admin)
- [x] Ajout utlisateur
- [x] supprimer un utlisateur
- [ ] modifier compte d'un utlisateur
- [x] lister des utlisateurs

## Gestion des stations (admin)
- [ ] Ajout station
- [ ] supprimer station
- [ ] modifier station
- [ ] lister station

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

## Aditional fonctionnality (client et chef station)
- [ ] utilisateur peut cree un compte
- [ ] utilisateur peut se connecter à son compte
- [ ] utilisateur consulter son compte
- [ ] utilisateur peut modifier son compte
- [ ] utilisateur peut supprimer son compte

## Database
- [x] utilisateurs (id, email, password, avatar, role)
- [x] stations (id_station, nom_station, ville)
- [ ] vehicules (id_vehicule, num_serie, destination, h_depart, d_depart, prix_place)
- [ ] reservations (nb_place_reserv)
- [ ] payments (id_payment, nom, prenom, tel, dc_payment)

## Performance
- [ ] fork app process into workers. (Clustering)
- [ ] Hot reload and redirect errors. (App never crash)

## Security
- [ ] CORS
- [ ] Password attack (hashing)
- [ ] ClickJacking attack
- [ ] DDOS attack
- [ ] DOS attack
- [ ] CSRF attack
- [ ] XSS attack

## Additional
- [ ] visitor reporting. (Charting)

## Notes
- h_depart -> heure de depart
- d_depart -> date de depart
- dc_payment -> date complet de payment (2019:06:06T10:25:40)