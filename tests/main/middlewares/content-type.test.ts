import { ApiServer } from '@/tests/main/helper'
import { Application } from 'express'

import request from 'supertest'

const sut = new ApiServer()
let app: Application

describe('Content Type Middleware', () => {
  beforeAll(async () => {
    await sut.init()
    app = sut.getApp()
  })

  afterAll(async () => {
    await sut.close()
  })

  test('Should return default content type as json', async () => {
    app.get('/test_content_type', (req, res) => {
      res.send('')
    })
    await request(app)
      .get('/test_content_type')
      .expect('content-type', /json/)
  })

  test('Should return xml content type when forced', async () => {
    app.get('/test_content_type_xml', (req, res) => {
      res.type('xml')
      res.send('')
    })
    await request(app)
      .get('/test_content_type_xml')
      .expect('content-type', /xml/)
  })
})
