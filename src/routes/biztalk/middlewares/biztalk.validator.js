const Joi = require('joi')
const empty = require('is-empty')
const logger = require('lib/logger')

exports.postSend = async (ctx, next) => {
  const schema = Joi.object({
    MESSAGE: Joi.string().required(),
    MESSAGE_TYPE: Joi.string().required(),
    SENDER_NUMBER: Joi.string().required(),
    RECEIVER_NUMBER: Joi.string().required(),
    SENDER_KEY: Joi.string().required(),
    TITLE: Joi.string().required(),
    TEMPLATE_CODE: Joi.string().required(),
    BODY_MESSAGE: Joi.string().required(),
  })

  const validation = Joi.validate(ctx.data, schema)

  if (validation.error) {
    ctx.error = validation.error
  }

  if (!empty(ctx.error)) {
    ctx.error.name = 'ValidationError'
    ctx.error.statusCode = 204
    logger.warn(`[ ${ctx.error.name} ] ${ctx.error.message} \n ${ctx.error}`)
    return
  }
  await next()
}