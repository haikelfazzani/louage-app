let weather = localStorage.getItem('weather')
let currentDay = Date.parse(new Date().toISOString().slice(0, 10))

if (weather && weather.length > 15) {
  let l = JSON.parse(weather)
  if(currentDay !== l.d) {
    setWeather(l.data)
  }  
  else {
    fetch('http://api.weatherbit.io/v2.0/current?key=7ba14d97fe684bdabe5da10e2e32c6eb&units=m&lang=fr&city=Tunis,TN')
      .then(res => res.json())
      .then(res => {
        let nextDay = currentDay + (1000 * 60 * 60 * 24)
        localStorage.setItem('weather', JSON.stringify({ d: nextDay, data: res.data[0] }))
        setWeather(res.data[0])
      })
      .catch(error => { })
  }
}
else {
  fetch('http://api.weatherbit.io/v2.0/current?key=7ba14d97fe684bdabe5da10e2e32c6eb&units=m&lang=fr&city=Tunis,TN')
    .then(res => res.json())
    .then(res => {
      let nextDay = currentDay + (1000 * 60 * 60 * 24)
      localStorage.setItem('weather', JSON.stringify({ d: nextDay, data: res.data[0] }))
      setWeather(res.data[0])
    })
    .catch(error => { })
}

function setWeather (data) {
  document.getElementById('weather').innerHTML = `      
      <img src="https://www.weatherbit.io/static/img/icons/${data.weather.icon}.png" alt="..." width="25">
      <span>${data.temp}°C</span>`
}