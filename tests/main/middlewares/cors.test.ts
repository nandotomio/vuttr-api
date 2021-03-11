import { ApiServer } from '@/tests/main/helper'
import { Application } from 'express'

import request from 'supertest'

const sut = new ApiServer()
let app: Application

describe('CORS Middleware', () => {
  beforeAll(async () => {
    await sut.init()
    app = sut.getApp()
  })

  afterAll(async () => {
    await sut.close()
  })

  test('Should enable CORS', async () => {
    app.get('/test_cors', (req, res) => {
      res.send()
    })
    await request(app)
      .get('/test_cors')
      .expect('access-control-allow-origin', '*')
      .expect('access-control-allow-methods', '*')
      .expect('access-control-allow-headers', '*')
  })
})
