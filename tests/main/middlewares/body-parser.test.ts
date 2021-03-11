import request from 'supertest'
import { ApiServer } from '@/tests/main/helper'

const sut = new ApiServer()

describe('Body Parser Middleware', () => {
  beforeAll(async () => {
    await sut.init()
  })

  afterAll(async () => {
    await sut.close()
  })

  test('Should parse body as json', async () => {
    sut.getApp().post('/test_body_parser', (req, res) => {
      res.send(req.body)
    })
    await request(sut.getApp())
      .post('/test_body_parser')
      .send({ name: 'Rodrigo' })
      .expect({ name: 'Rodrigo' })
  })
})
