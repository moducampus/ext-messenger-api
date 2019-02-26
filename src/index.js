require('dotenv').config()

const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const Router = require('koa-router')

const biztalk = require('./routes/biztalk')
const sms = require('./routes/sktelink')

const router = new Router()
const app = new Koa()

/* middleware config*/
app.use(bodyParser())

/* router config */
router.use('/biztalk', biztalk.routes())
router.use('/sms', sms.routes())

app.use(router.routes())
app.use(router.allowedMethods())

app.listen(50001, () => {
  console.log('Server is running!')
})