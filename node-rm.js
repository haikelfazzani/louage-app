var { rmSpacesComments, readFiles, getFiles, writeOrCreateFile } = require('node-rm')

let cssFiles = [
  './public/stylesheets/style.css',
  './public/stylesheets/datatable.css',
  './public/stylesheets/animation.css'
]
let content = readFiles(cssFiles)
 
writeOrCreateFile(rmSpacesComments(content), './public/stylesheets/bundle.css')
.then(info => {
  console.log(info)
})
.catch(err => {
  console.log(err)
})