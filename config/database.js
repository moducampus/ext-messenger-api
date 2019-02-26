require('dotenv').config()

const {
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_PASSWORD,
  DB_NAME_KAKAO,
  DB_NAME_SMS,
} = process.env

const commonDBConfig = {
  host: DB_HOST,
  port: DB_PORT,
  user: DB_USER,
  password: DB_PASSWORD,
  connectionLimit: 5,
}

module.exports = {
  development: {
    biztalk: {
      ...commonDBConfig,
      connectionLimit: 1,
      database: DB_NAME_KAKAO,
    },
    sktelink: {
      ...commonDBConfig,
      connectionLimit: 1,
      database: DB_NAME_SMS,
    },
  },
  production: {
    biztalk: {
      ...commonDBConfig,
      connectionLimit: 5,
      database: DB_NAME_KAKAO,
    },
    sktelink: {
      ...commonDBConfig,
      connectionLimit: 5,
      database: DB_NAME_SMS,
    },
  },
  test: {
    biztalk: {
      ...commonDBConfig,
      connectionLimit: 1,
      database: DB_NAME_KAKAO,
    },
    sktelink: {
      ...commonDBConfig,
      connectionLimit: 1,
      database: DB_NAME_SMS,
    },
  },
}