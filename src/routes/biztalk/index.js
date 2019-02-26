const Router = require('koa-router')

/* middlewares */
const validator = require('./middlewares/biztalk.validator')  
const factory = require('./middlewares/biztalk.factory') 
const service = require('./middlewares/biztalk.service')

const biztalk = new Router()
biztalk.post('/api/send', factory.postSend, validator.postSend, service.postSend,)

module.exports = biztalk