import request from 'supertest'
import { ApiServer } from '@/tests/main/helper'
import { Application } from 'express'

const sut = new ApiServer()
let app: Application

describe('Body Parser Middleware', () => {
  beforeAll(async () => {
    await sut.init()
    app = sut.getApp()
  })

  afterAll(async () => {
    await sut.close()
  })

  test('Should parse body as json', async () => {
    app.post('/test_body_parser', (req, res) => {
      res.send(req.body)
    })
    await request(app)
      .post('/test_body_parser')
      .send({ name: 'Test' })
      .expect({ name: 'Test' })
  })
})
