module.exports = {
  development: {
    console: {
      level: 'silly',
    },
  },
  production : {
    rotateFile: {
      level: 'info',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
    },
  },
  test : {
    console: {
      level: 'silly',
    },
  },
}