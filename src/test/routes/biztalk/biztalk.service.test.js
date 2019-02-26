const service = require('routes/biztalk/middlewares/biztalk.service')
const context = require('lib/mockKoaContext')
const testData = require('../biztalk/testdata')
const functionLib = require('test/lib/promiseNext')

const { 
  expect, 
} = require('chai')

describe('biztalk service 코드 테스트', () => {

  const mockContext = context()
  mockContext.data = testData.dataForValidator
  mockContext.database = 'hello'

  it('Service Error 발생 시 error 잡아 내는가', (done) => {
    service.postSend(mockContext, functionLib.next(done))
      .catch((e) => {
        expect(e.statusCode).to.equal(500)
        done()
      })
  })
})
