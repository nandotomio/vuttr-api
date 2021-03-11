import { ApiServer } from '@/tests/main/helper'
import { mockAddAccountParams } from '@/tests/domain/mocks'
import { AccountTypeormEntity } from '@/infra/db'

import { Connection, MongoRepository } from 'typeorm'
import { Application } from 'express'
import request from 'supertest'

const sut = new ApiServer()
let app: Application
let dbConnection: Connection
let accountRepository: MongoRepository<AccountTypeormEntity>

describe('Login Routes', () => {
  beforeAll(async () => {
    await sut.init()
    app = sut.getApp()
    dbConnection = sut.getDbConnection()
  })

  afterAll(async () => {
    await sut.close()
  })

  beforeEach(async () => {
    accountRepository = dbConnection.getMongoRepository(AccountTypeormEntity)
    await accountRepository.deleteMany({})
  })

  describe('POST /signup', () => {
    test('Should return 200 on signup', async () => {
      const addAccountParams = mockAddAccountParams()
      const fakeRequest = {
        ...addAccountParams,
        passwordConfirmation: addAccountParams.password
      }
      await request(app)
        .post('/api/signup')
        .send(fakeRequest)
        .expect(200)
      await request(app)
        .post('/api/signup')
        .send(fakeRequest)
        .expect(403)
    })
  })
})
