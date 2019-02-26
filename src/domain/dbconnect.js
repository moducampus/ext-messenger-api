const mysql = require('mysql')
const empty = require('is-empty')
const logger = require('lib/logger')
const dbConfig = require('../../config/database')

require('dotenv').config()

const {
  NODE_ENV,
} = process.env

const dataSource = dbConfig[NODE_ENV].biztalk
const dbPool = mysql.createPool(dataSource)

/*
  @params: database ENUM('kakao', 'sktelink') is Required
*/

exports.connect = (database) => {
  return new Promise((resolve,reject) => {
    let pool
    if (empty(database)){
      const emptyError = new Error('Database Emptyness')
      emptyError.name = 'DatabaseError'
      reject(emptyError)
    }

    if(database === 'biztalk' || database === 'sktelink' ) {
      pool = dbPool
    } else {
      const nameError = new Error('Database Name Incorrectness')
      nameError.name = 'DatabaseError'
      reject(nameError)
    }

    pool.getConnection((error, connection) => {
      logger.log('debug', `${database} databse connected!`)
      if (error) {
        reject(error)
      }
      resolve(connection)
    })
  })
}