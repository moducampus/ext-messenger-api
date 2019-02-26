const Base64 = require('base-64')
const UTF8 = require('utf8')
const _ = require('lodash')

function stringEncode(string) {
  const text = UTF8.encode(string)
  const bytes = Base64.encode(text)
  return bytes
}
function stringDecode(string) {
  const bytes = Base64.decode(string)
  const text = UTF8.decode(bytes)
  return text
}

// doesn't support deep
exports.decodeToValueOfObject = (obj) => {
  const object = _.clone(obj)
  Object.keys(object).forEach((key) => {
    object[key] = stringDecode(object[key])
  })
  return object
}

exports.encodeToValueOfObject = (obj) => {
  const object = _.clone(obj)
  Object.keys(object).forEach((key) => {
    object[key] = stringEncode(object[key])
  })
  return object
}