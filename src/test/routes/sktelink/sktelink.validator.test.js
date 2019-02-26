const _ = require('lodash')

const validator = require('routes/sktelink/middlewares/sktelink.validator')
const context = require('lib/mockKoaContext')
const testData = require('./testdata')
const functionLib = require('test/lib/promiseNext')

const { 
  expect, 
} = require('chai')

describe('sktelink validator 코드 테스트', () => {
  const mockContext = context()

  it('RECEIVER가 존재하지 않을 때', (done) => {
    const test = _.clone(testData.postSendDecodedRequestBody)
    delete test.RECEIVER
    mockContext.data = test

    validator.postSend(mockContext, functionLib.next(done))
    expect(mockContext.error.message).to.equal('child "RECEIVER" fails because ["RECEIVER" is required]')
    done()
  })
})