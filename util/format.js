module.exports = (function (date) { // 2019-08-16
  const months = [
    "jan", "fév", "mars", "avril", "mai", "juin", "juil", "août", "sep", "oct", "nov", "déc"
  ]
  const jours = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi']
  let d = new Date(date)
  return jours[d.getDay()] + ', ' + d.getDate() + ' ' + months[d.getMonth()] + ' ' + d.getFullYear()
})