import { ApiServer } from '@/tests/main/helper'
import { mockAddToolParams } from '@/tests/domain/mocks'
import { ToolTypeormEntity } from '@/infra/db'

import { Connection, Repository } from 'typeorm'
import { Application } from 'express'
import request from 'supertest'

const sut = new ApiServer()
let app: Application
let dbConnection: Connection
let toolRepository: Repository<ToolTypeormEntity>

describe('Tool Routes', () => {
  beforeAll(async () => {
    await sut.init()
    app = sut.getApp()
    dbConnection = sut.getDbConnection()
  })

  afterAll(async () => {
    await sut.close()
  })

  beforeEach(async () => {
    toolRepository = dbConnection.getRepository(ToolTypeormEntity)
    await toolRepository.delete({})
  })

  describe('POST /tools', () => {
    test('Should return 201 on success', async () => {
      const fakeRequest = mockAddToolParams()
      await request(app)
        .post('/api/tools')
        .send(fakeRequest)
        .expect(201)
      await request(app)
        .post('/api/tools')
        .send(fakeRequest)
        .expect(403)
    })
  })
})
