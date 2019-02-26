const Joi = require('joi')
const empty = require('is-empty')
const logger = require('lib/logger')

const SENDER_NUMBER = process.env.SENDER_NUMBER

exports.postSend = async (ctx, next) => {
  const schema = Joi.object({
    SENDER: Joi.string().required(),
    RECEIVER: Joi.string().required(),
    TITLE: Joi.string().required(),
    MESSAGE: Joi.string().required(),
  })

  const validation = Joi.validate(ctx.data, schema)

  if (validation.error) {
    ctx.error = validation.error
  }

  if (!empty(ctx.error)) {
    ctx.error.name = 'ValidationError'
    ctx.error.statusCode = 400
    logger.warn(`[ ${ctx.error.name} ] ${ctx.error.message} \n ${ctx.error}`)
    return
  }

  await next()
}