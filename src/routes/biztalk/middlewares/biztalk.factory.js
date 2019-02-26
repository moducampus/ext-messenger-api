const base64Utils = require('lib/base64')
const empty = require('is-empty')
const logger = require('lib/logger')

const ResponseFactory = require('lib/responseFactory')

exports.postSend = async (ctx, next) => {
  logger.log('info', 'request message\n %s', ctx.request.body)
  ctx.database = 'biztalk'
  ctx.error = {}
  try {
    const decodedBody = base64Utils.decodeToValueOfObject(ctx.request.body)
    ctx.data = decodedBody
    logger.debug('decoded request message\n %s', ctx.data)
  } catch (e) {
    e.name = 'RequestFactoryError'
    e.statusCode = 400
    ctx.error = e
    logger.warn(`[ ${ctx.error.name} ] Check request parameters, something went wrong in base64 decoding \n ${ctx.error}`)
    throw(e)
  }

  await next()

  if (!empty(ctx.error)) {
    ctx.response.status = ctx.error.statusCode
  }else{
    const encodedBody = base64Utils.encodeToValueOfObject(ctx.data)
    ctx.response.body = ResponseFactory.build(encodedBody, ctx.error) 
  }

  logger.info('response message\n ', ctx.response.body)
}