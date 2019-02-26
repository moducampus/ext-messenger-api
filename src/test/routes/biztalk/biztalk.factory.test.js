const _ = require('lodash')

const factory = require('routes/biztalk/middlewares/biztalk.factory')
const context = require('lib/mockKoaContext')
const testData = require('./testdata')
const functionLib = require('test/lib/promiseNext')

const { 
  expect, 
} = require('chai')

describe('biztalk factory 코드 테스트', () => {
  const mockContext = context()
  it('MESSAGE에 base64 인코딩 문자열이 아닌 숫자 문자열이 들어갔을 때', (done) => {
    const test = _.clone(testData.postSendRequestBody)
    test.MESSAGE = '123456'
    mockContext.request.body = test
    factory.postSend(mockContext, functionLib.next(done))
      .catch((e) => {
        expect(e).to.equal(mockContext.error)
        done()
      })
  })
})