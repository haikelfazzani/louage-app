const months = [
  "jan", "fév", "mars", "avril", "mai", "juin", "juil", "août", "sep", "oct", "nov", "déc"
];

fetch('/admin/voyages.json')
  .then(res => res.json())
  .then(voyages => {
    let voyageParMoi = voyages.reduce((a, c) =>
      (v = months[new Date(c.date_depart).getMonth()], a[v] ? a[v]++ : a[v] = 1, a), [])

    let objReserv = []

    for (let i in voyageParMoi) {
      objReserv.push({ n: voyageParMoi[i], m: i, indx: months.indexOf(i) })
    }
    objReserv.sort((i, j) => i.indx - j.indx).unshift({ n: 0, m: "-", indx: 0 });

    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: objReserv.map(v => v.m),
        datasets: [{
          label: 'nombre de voyages par moi',
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
              callback: function (value) { if (value % 1 === 0) { return value; } }
            }
          }]
        }
      }
    });
  })
  .catch(error => { })