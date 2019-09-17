// validation pour les formulaire : login et register

let formRegister = document.querySelector('.form-signin');
//email ou mot de passe incorrect!
function isPureStr (str) {
  return (/^[a-z0-9@\.\-]*$/gi.test(str) && str.length > 5)
}

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


document.addEventListener('DOMContentLoaded', () => {
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

})