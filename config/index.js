const {
  NODE_ENV,
} = process.env

const logger = require('./logger')[NODE_ENV]

module.exports = {
  logger,
}