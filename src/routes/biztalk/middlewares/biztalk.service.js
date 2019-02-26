const database = require('domain/dbconnect')
const biztalkModel = require('domain/models/biztalk')
const logger = require('lib/logger')

exports.postSend = async (ctx, next) => {
  let connection
  try {
    connection = await database.connect(ctx.database)
    const insertMessageResult = await biztalkModel.insertMessage(connection, ctx.data)
    if (insertMessageResult.affectedRows !== 1){
      const error = new Error('affectedRows is not only one. You must check the sql at models/biztalk.js') 
      throw error
    }
  } catch (e) {
    if (e.name === 'Error') e.name = 'ServiceError'
    e.statusCode = 500
    ctx.error = e
    logger.error(`[ ${ctx.error.name} ] ${ctx.error.message} \n ${ctx.error}`)
    throw(ctx.error)
  }
  connection.release()
  await next()
}