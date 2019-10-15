const months = [
  "jan", "fév", "mars", "avril", "mai", "juin", "juil", "août", "sep", "oct", "nov", "déc"
]

fetch('/admin/utilisateurs.json')
  .then(res => res.json())
  .then(utilisateurs => {
    document.getElementById('len-users').textContent = utilisateurs.length;
    let userByMonth = utilisateurs.reduce((a, c) =>
      (v = months[new Date(c.timestamp_utilisateur).getMonth()], a[v] ? a[v]++ : a[v] = 1, a), []);

    let objUsers = []

    for (let i in userByMonth) {
      objUsers.push({ n: userByMonth[i], m: i, indx: months.indexOf(i) })
    }

    objUsers = objUsers.sort((i, j) => i.indx - j.indx)

    var options = {
      chart: { height: 350, type: 'bar', zoom: { enabled: false } },
      series: [{ name: "Nombre des utilisateurs", data: objUsers.map(v => v.n) }],
      dataLabels: { enabled: true },
      stroke: { curve: 'straight' },
      title: { text: 'Nombre des utilisateurs par mois', align: 'center' },
      colors: ['#28a745'],
      grid: {
        row: { borderColor: '#e7e7e7', colors: ['#f3f3f3', 'transparent'], opacity: 0.5 },
      },
      xaxis: { categories: objUsers.map(v => v.m) }
    }
    new ApexCharts(document.getElementById("chart-utilisateurs"), options).render()
  })
  .catch(e => { })


fetch('/admin/stations.json')
  .then(res => res.json())
  .then(stations => {
    document.getElementById('len-stations').textContent = stations.length;
    let userByMonth = stations.reduce((a, c) => (v = c.ville, a[v] ? a[v]++ : a[v] = 1, a), [])
    let objStation = []

    for (let i in userByMonth) {
      objStation.push({ n: userByMonth[i], m: i, indx: months.indexOf(i) })
    }

    objStation = objStation.sort((i, j) => i.indx - j.indx)

    var options = {
      chart: { height: 350, type: 'bar', zoom: { enabled: false } },
      series: [{ name: "Nombre des stations", data: objStation.map(v => v.n) }],
      dataLabels: { enabled: true },
      stroke: { curve: 'straight' },
      title: { text: 'Nombre des stations par ville', align: 'center' },
      colors: ['#28a745'],
      grid: {
        row: { borderColor: '#e7e7e7', colors: ['#f3f3f3', 'transparent'], opacity: 0.5 },
      },
      xaxis: { categories: objStation.map(v => v.m) }
    }
    new ApexCharts(document.getElementById("chart-stations"), options).render()
  })
  .catch(e => { })