module.exports = (function (obj) {
  return Object.values(obj).some(o => strContainsSQL(o) || o.length < 5)
})

function strContainsSQL (s) {
  let check = /drop|select|table|update|delete|database|where|or|and|\*/gi.test(s)
  if (check) {
    throw "string contains an SQL synthax";
  }
  return check
}