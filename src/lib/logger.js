const fs = require('fs')
const path = require('path')
const moment = require('moment')

const DailyRotateFile = require('winston-daily-rotate-file')
const Winston = require('winston')
const {
  transports,
  format,
  createLogger,
} = Winston

const {
  logger: loggerConfig,
} = require('mc_config')

loggerConfig.console = loggerConfig.console || {}
loggerConfig.rotateFile = loggerConfig.rotateFile || {}

const {
  NODE_ENV,
} = process.env

const logDir = 'logs'

if (!fs.existsSync(logDir)) fs.mkdirSync(logDir)

const logFilePathname = path.join(__dirname, '/../../', logDir, '%DATE%.log')

const fileTransport = new DailyRotateFile({
  ...loggerConfig.rotateFile,

  filename: logFilePathname,
  format: format.combine(
    format.splat(),
    format.json(),
    format.ms(),
  ),
})

const consoleTransport = new transports.Console({
  ...loggerConfig.console,
  name: 'consoleTransport',
  format: format.combine(
    format.colorize(),
    format.simple(),
    format.splat(),
    format.ms(),
  ),
})


const transportList = {
  development: [
    consoleTransport,
  ],
  production: [
    fileTransport,
  ],
}

const logger = createLogger({
  format: format.combine(
    format.timestamp({
      format: () => ( moment().format() ),
    }),
    format.simple()
  ),
  transports: transportList[NODE_ENV],
  silent: NODE_ENV === 'test' ? true : false,
})

module.exports = logger