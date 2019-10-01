(function () {
  fetch('/admin/utilisateurs.json')
    .then(r => r.json())
    .then(users => {
      let tbodyUsers = document.getElementById('tbody-users')
      let inputSearch = document.getElementById('input-search')

      inputSearch.onkeyup = (e) => {
        let val = e.target.value.trim()

        let newUsers = val.length > 0 ? users.filter(u => u.email.startsWith(val) || u.role.startsWith(val)) : users;
        tbodyUsers.innerHTML = null
        newUsers.forEach(u => {
          tbodyUsers.innerHTML += setUsers(u)
        })

        let btnDelete = document.querySelectorAll('.btn-delete')
        btnDelete.forEach(b => {
          b.onclick = () => confirm('voulez-vous vraiment supprimer ?')
        })
      }

      function setUsers (u) {
        return `
        <tr>
          <td>${u.nom ? u.nom : '-'}</td>
          <td>${u.prenom ? u.prenom : '-'}</td>
          <td>${u.email}</td>
          <td>${u.etat_email === 1 ? 'activer' : 'non activer'}</td>
          <td>${u.tel ? u.tel : '-'}</td>
          <td>${u.role}</td>
          <td>${new Date(u.timestamp_utilisateur).toString().slice(0,24)}</td>
          <td>
            <a class="btn btn-danger btn-delete" href="/admin/utilisateurs/supprimer?email=${u.email}"><i
                class="fas fa-trash-alt"></i></a>
          </td>
        </tr>`
      }
    })
    .catch(e => { })
})()