// validation pour les formulaire : login et register
let formRegister = document.querySelector('.form-signin');
//email ou mot de passe incorrect!
function isPureStr (str) {
  return (/^[a-z0-9\xBF-\xFF@\.\-\_]*$/gi.test(str) && str.length > 5)
}

function isValidInput (str) {
  return (/^[a-z0-9\xBF-\xFF\s+\@\.\-\_\#]*$/gi.test(str) && str.length > 0)
}

let generalForm = document.querySelector('.form-general')
if (generalForm) {
  generalForm.onsubmit = (e) => {

    let elmnts = generalForm.elements, inputValues = [];
    for (let el in elmnts) {
      inputValues.push(elmnts[el].value)
    }

    inputValues = inputValues.filter(vi => vi !== undefined && vi.length > 0)
    if (!inputValues.some(v => !isValidInput(v))) {
      return true
    }

    e.preventDefault()
    var x = document.querySelector(".error-snack")
    x.classList.add("showsnack")
    x.textContent = 'Entrée de données ne sont pas valide!'

    setTimeout(function () { x.className = x.className.replace("showsnack", "") }, 5000);
    return false
  }
}

/** form validation for forms contains email and password */
if (formRegister) {
  formRegister.onsubmit = e => {

    let email = e.target.email.value
    let pass = e.target.password.value

    if (isPureStr(email) && isPureStr(pass)) {
      return true
    }
    else {
      e.preventDefault()
      let msgForm = document.querySelector('#form-signin')
      msgForm.style.display = 'block';
      msgForm.textContent = 'Email ou mot de passe invalide!';

      setTimeout(() => { msgForm.style.display = 'none' }, 3000)
      return false
    }
  }
}

/** input image file validation */
(function () {
  const inputAvatar = document.getElementById("inputImage");
  const btnChangeAvatar = document.getElementById("btn-update-avatar");

  if (btnChangeAvatar) {
    btnChangeAvatar.disabled = true;
    inputAvatar.onchange = (event) => {
      let inputValue = event.target.value; // C:\fakepath\7.PNG
      inputValue = inputValue.match(/\.[0-9a-z]+$/i)[0].toLowerCase();

      const validExtensions = [".png", ".jpeg", ".jpg", ".svg"];
      let isValid = validExtensions.includes(inputValue);

      btnChangeAvatar.disabled = isValid ? false : true;

      isValid ? previewImage(event) : "";
    }
  }
}())

function previewImage (event) {
  const imgField = document.querySelector(".img-thumbnail");
  const reader = new FileReader();

  reader.onload = () => {
    if (reader.readyState === 2) {
      imgField.src = reader.result;
    }
  }
  reader.readAsDataURL(event.target.files[0]);
}

/** alert confirm before delete */
let btnDelete = document.querySelectorAll('.btn-delete')
btnDelete.forEach(b => {
  b.onclick = () => confirm('voulez-vous vraiment supprimer ?')
})

let btnCancel = document.querySelectorAll('.btn-cancel')
btnCancel.forEach(b => {
  b.onclick = () => confirm('voulez-vous vraiment annuler ?')
})

/** Contact Page Form */
let btnSend = document.getElementById('btn-send-mail'), r = '';
if (btnSend) {
  btnSend.disabled = true
  let check = (s) => /^[a-z0-9\;\.\,\+\-\s+ ]+$/gmi.test(s)

  document.getElementById('message').onkeyup = (e) => {
    r = e.target.value
    if (check(r.replace(/\r|\n/g, ''))) {
      if (r.length > 50) btnSend.disabled = false
      else btnSend.disabled = true
    }
    else {
      btnSend.disabled = true
    }
  }
}

$(document).ready(function () {
  $('#myTable').DataTable({
    language: {
      processing: "Traitement en cours...",
      search: "Rechercher&nbsp;:",
      lengthMenu: "Afficher _MENU_ &eacute;l&eacute;ments",
      info: "Affichage de l'&eacute;lement _START_ &agrave; _END_ sur _TOTAL_ &eacute;l&eacute;ments",
      infoEmpty: "Affichage de l'&eacute;lement 0 &agrave; 0 sur 0 &eacute;l&eacute;ments",
      infoFiltered: "(filtr&eacute; de _MAX_ &eacute;l&eacute;ments au total)",
      infoPostFix: "",
      loadingRecords: "Chargement en cours...",
      zeroRecords: "Aucun &eacute;l&eacute;ment &agrave; afficher",
      emptyTable: "Aucune donnée disponible dans le tableau",
      paginate: {
        first: "Premier",
        previous: "Pr&eacute;c&eacute;dent",
        next: "Suivant",
        last: "Dernier"
      },
      aria: {
        sortAscending: ": activer pour trier la colonne par ordre croissant",
        sortDescending: ": activer pour trier la colonne par ordre décroissant"
      }
    }
  })
})