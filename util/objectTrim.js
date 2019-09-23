module.exports = function objectTrim (o) {
  return Object.keys(o).reduce((a, c) => {
    a[c] = o[c].trim()
    return a
  }, {})
}