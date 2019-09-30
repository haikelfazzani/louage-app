let btnAjout = document.getElementById('btn-ajout')
btnAjout.disabled = true
document.getElementById('prixPlace').onkeyup = (e) => {
  btnAjout.disabled = +(e.target.value) > 0 ? false : true
}