document.getElementById('btn-export').onclick = () => {
  var divToPrint = document.getElementById('ticket')
  var newWin = window.open('', 'Print-Window')
  newWin.document.open()

  newWin.document.write(`
  <html><body onload="window.print()">
  <link rel="stylesheet" href="/stylesheets/bootstrap.css" />
  <style>
    .toast { padding: 20px; }
    .toast small { text-transform: uppercase; color: #afafaf !important; }
    .toast h4 { font-size: 20px; }
    .col-md-8 iframe { max-height: 190px }
  </style>
  ${divToPrint.innerHTML}
  </body></html>
`)
  newWin.document.close();
  setTimeout(function () { newWin.close() }, 10)
}