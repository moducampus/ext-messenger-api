const _ = require('lodash')

const biztalk = require('domain/models/biztalk')
const database = require('domain/dbconnect')
const context = require('lib/mockKoaContext')
const testData = require('../../routes/biztalk/testdata')

const { 
  expect, 
} = require('chai')

describe('데이터베이스에 데이터 추가 테스트', async() => {
  const connection = await database.connect('biztalk')

  const mockContext = context()
  mockContext.data = testData.dataForValidator

  it('데이터베이스에 넣을 값이 안 들어 왔을 때', (done) =>{
    const test = _.clone(testData.dataForValidator)
    delete test.RECEIVER_NUMBER
    mockContext.data = test
    biztalk.insertMessage(connection, mockContext.data)
      .catch((error) => {
        expect(error.executedQuery).is.not.empty
        done()
      })
  })
})
