const _ = require('lodash')

const validator = require('routes/biztalk/middlewares/biztalk.validator')
const context = require('lib/mockKoaContext')
const testData = require('./testdata')
const functionLib = require('test/lib/promiseNext')

const { 
  expect, 
} = require('chai')

describe('biztalk validator 코드 테스트', () => {
  const mockContext = context()

  it('RECEIVER_NUMBER가 존재하지 않을 때', (done) => {
    const test = _.clone(testData.postSendDecodedRequestBody)
    delete test.RECEIVER_NUMBER
    mockContext.data = test

    validator.postSend(mockContext, functionLib.next(done))
    expect(mockContext.error.message).to.equal('child "RECEIVER_NUMBER" fails because ["RECEIVER_NUMBER" is required]')
    done()
  })
  it('SENDER_KEY에 문자열이 아닌 숫자가 왔을 때', (done) => {
    const test = _.clone(testData.postSendDecodedRequestBody)
    test.SENDER_KEY = 12345
    mockContext.data = test

    validator.postSend(mockContext, functionLib.next(done))
    expect(mockContext.error.message).to.equal('child "SENDER_KEY" fails because ["SENDER_KEY" must be a string]')
    done()
  })
})