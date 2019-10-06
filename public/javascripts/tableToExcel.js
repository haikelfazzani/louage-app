function tableToExcel (tableID, filename = '') {
  var downloadLink,
    dataType = 'application/vnd.ms-excel',
    tableSelect = document.getElementById(tableID),
    tableHTML = tableSelect.outerHTML.replace(/ /g, '%20');

  filename = filename ? filename + '.xls' : 'excel_data.xls';
  downloadLink = document.createElement("a")
  document.body.appendChild(downloadLink)
  if (navigator.msSaveOrOpenBlob) {
    var blob = new Blob(['\ufeff', tableHTML], { type: dataType })
    navigator.msSaveOrOpenBlob(blob, filename);
  } else {
    downloadLink.href = 'data:' + dataType + ', ' + tableHTML;
    downloadLink.download = filename;
    downloadLink.click()
  }
}