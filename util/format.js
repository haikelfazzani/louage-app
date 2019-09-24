module.exports = (function (date) { // 2019-08-16
  const months = [
    "jan", "fév", "mars", "avril", "mai", "juin", "juil", "août", "sep", "oct", "nov", "déc"
  ];

  const jours = ['samedi', 'dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi']

  let d = new Date(date)
  let j = d.getDay()
  let m = d.getMonth()
  let y = d.getFullYear()
  
  return jours[j] + ', ' + (d.getDate() - 1) + ' ' + months[m] + ' ' + y
})