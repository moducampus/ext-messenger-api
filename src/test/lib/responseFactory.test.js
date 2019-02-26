const responseFactory = require('lib/responseFactory')
const testData = require('../routes/biztalk/testdata')

const { 
  expect, 
} = require('chai')

describe('responseFactory 코드 테스트', () => {
  const serviceError = new Error('something happened in Service code')
  serviceError.name = 'ServiceError'
  it('service 로직에서 에러가 발생했을 때', (done) => {
    const returnBody = responseFactory.build(testData.postSendRequestBody, serviceError)
    expect(returnBody.RESULT_CODE).to.equal('50000')
    done()
  })
  it('service 로직이 정상적으로 작동했을 때', (done) => {
    const returnBody = responseFactory.build(testData.postSendRequestBody,{})
    expect(returnBody.RESULT_CODE).to.equal('20000')
    done()
  })
})