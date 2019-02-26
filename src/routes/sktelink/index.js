const Router = require('koa-router')

/* middlewares */
const validator = require('./middlewares/sktelink.validator')  
const factory = require('./middlewares/sktelink.factory') 

const service = require('./middlewares/sktelink.service')

const sktelink = new Router()

sktelink.post('/api/send', factory.postSend, validator.postSend,service.postSend, ) 

module.exports = sktelink