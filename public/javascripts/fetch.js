fetch('http://api.weatherbit.io/v2.0/current?key=7ba14d97fe684bdabe5da10e2e32c6eb&units=m&lang=fr&city=Tunis,TN')
  .then(res => res.json())
  .then(res => {
    res.data = res.data[0]
    document.getElementById('weather').innerHTML = `      
      <img src="https://www.weatherbit.io/static/img/icons/${res.data.weather.icon}.png" alt="..." width="60">
      <span>${res.data.temp}°C <i class="fas fa-compass"></i><i> Tunis</i></span>`
  })
  .catch(error => { })