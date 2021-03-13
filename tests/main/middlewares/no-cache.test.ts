import { noCache } from '@/main/middlewares'
import { ApiServer } from '@/tests/main/helper'

import { Application } from 'express'
import request from 'supertest'

const sut = new ApiServer()
let app: Application

describe('NoCache Middleware', () => {
  beforeAll(async () => {
    await sut.init()
    app = sut.getApp()
  })

  afterAll(async () => {
    await sut.close()
  })

  test('Should disable cache', async () => {
    app.get('/test_no_cache', noCache, (req, res) => {
      res.send()
    })
    await request(app)
      .get('/test_no_cache')
      .expect('cache-control', 'no-store, no-cache, must-revalidate, proxy-revalidate')
      .expect('pragma', 'no-cache')
      .expect('expires', '0')
      .expect('surrogate-control', 'no-store')
  })
})
