const empty = require('is-empty')

exports.build = (encodedBody, error) => {
  let returnBody
  if (error.statusCode === 200 || empty(error)) {
    returnBody = {
      RESULT_CODE: '20000',
      RESULT_DESC: 'SUCCESS',
      RESULT_PARAMS: encodedBody,
      RESULT_MESSAGE: 'SUCCESS',
    }
  } else {
    returnBody = {
      RESULT_CODE: '50000',
      RESULT_DESC: 'NOT_SATISFIED_PARAM',
      RESULT_MESSAGE: 'FAIL',
    }
  }
  return returnBody
}