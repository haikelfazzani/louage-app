let btnNotif = document.querySelectorAll('.list-group-item')
btnNotif.forEach(b => {
  b.onclick = () => {
    let data = JSON.parse(b.getAttribute('data-notif'));
    document.querySelector('.modal-body').innerHTML = `
      <div class="d-flex w-100 justify-content-between">
        <h5 class="mb-1" id="sujet">${data.sujet}</h5>
        <small><span class="badge badge-primary">${data.timestamp_notification}</span></small>
      </div>
      <p class="text-break mb-1">${data.message}</p>
      <small><i class="fas fa-map-marker-alt"></i> ${data.nom_station}</small>`
  }
})