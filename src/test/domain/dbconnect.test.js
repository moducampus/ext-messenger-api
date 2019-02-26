const dbUtil = require('domain/dbconnect.js')
const connect = dbUtil.connect

const chai = require('chai')
const expect = chai.expect


describe('데이터베이스 연결 테스트', () => {
  it('데이터베이스 이름이 파라미터로 넘어오지 않았을 때', (done) => {
    connect()
      .catch((error) => {
        expect(error.message).to.equal('Database Emptyness')
        done()
      })
  })
  it('데이터베이스 이름이 올바르지 않을 때', (done) => {
    connect('hello')
      .catch((error) => {
        expect(error.message).to.equal('Database Name Incorrectness')
        done()
      })
  })
  it('올바른 값을 넣었을 때', (done) => {
    connect('biztalk')
    done()
  })
})
