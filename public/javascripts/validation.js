// validation pour les formulaire : login et register

let formRegister = document.querySelector('.form-signin');
//email ou mot de passe incorrect!
function isPureStr (str) {
  return (/^[a-z0-9\xBF-\xFF@\.\-\_]*$/gi.test(str) && str.length > 5)
}

function isValidInput (str) {
  return (/^[a-z0-9\xBF-\xFF\s+\@\.\-\_]*$/gi.test(str) && str.length > 0)
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

    var x = document.getElementById("snackbar")
    x.className = "show";
    x.textContent = 'Entrée de données ne sont pas valide!'

    setTimeout(function () { x.className = x.className.replace("show", "") }, 5000);

    return false
  }
}

/** form validation for forms contains email and password */
if (formRegister) {
  formRegister.onsubmit = e => {

    let email = e.target.email.value;
    let pass = e.target.password.value;

    if (isPureStr(email) && isPureStr(pass)) {
      return true
    }
    else {
      let msgForm = document.querySelector('#form-signin');
      msgForm.style.display = 'block';
      msgForm.textContent = 'Email ou mot de passe invalide!';

      setTimeout(() => {
        msgForm.style.display = 'none';
      }, 3000);

      return false;
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
}());

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

/** form validation : changer mot de passe */
let formPass = document.getElementById('form-pass')

function isValidPass (str) {
  return (/^[a-z0-9\xBF-\xFF\s+\@\.\-\_\#]*$/gi.test(str) && str.length > 5)
}

if(formPass) {
  formPass.onsubmit = (e) => {

    let pass = e.target.password.value
    if (isValidPass(pass) && e.target.confpassword.value === pass) {
      return true
    }
  
    let alert = document.getElementById('alert-pass')
    alert.textContent = 'mot de passe incorrect ou contient des charactére n\'ont valide';
    alert.style.display = 'block';
    setTimeout(() => { alert.style.display = 'none' }, 5000)
    return false
  }
}