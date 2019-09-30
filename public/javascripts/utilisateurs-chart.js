const months = [
  "jan", "fév", "mars", "avril", "mai", "juin", "juil", "août", "sep", "oct", "nov", "déc"
]

fetch('/admin/utilisateurs.json')
  .then(res => res.json())
  .then(utilisateurs => {
    let userByMonth = utilisateurs.reduce((a, c) =>
      (v = months[new Date(c.timestamp_utilisateur).getMonth()], a[v] ? a[v]++ : a[v] = 1, a), []);      

    let objReserv = []

    for (let i in userByMonth) {
      objReserv.push({ n: userByMonth[i], m: i, indx: months.indexOf(i) })
    }

    objReserv = objReserv.sort((i, j) => i.indx - j.indx)  

    var ctx = document.getElementById('myChart').getContext('2d')
    var myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: objReserv.map(v => v.m),
        datasets: [{
          label: 'nombre des utilisateurs par mois',
          data: objReserv.map(v => v.n),
          backgroundColor: '#e91e63',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
              callback: function (value) { if (value % 1 === 0) { return value } }
            }
          }]
        }
      }
    })
  })
  .catch(error => { })