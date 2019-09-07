// validation pour les formulaire : login et register

let formRegister = document.querySelector('.form-signin');
//email ou mot de passe incorrect!
function isPureStr (str) {
  return /^[a-z0-9@\.\-]*$/gi.test(str)
}

formRegister.onsubmit = e => {

  let email = e.target.email.value;
  let pass = e.target.password.value;  

  if(isPureStr(email) && isPureStr(pass)) {
    return true
  }
  else {
    let msgForm = document.querySelector('#form-signin');
    msgForm.style.display = 'block';
    msgForm.textContent = 'Email ou mot de passe contient des charactéres invalide!';
    return false;
  }
}
