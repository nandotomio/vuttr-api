import setupMiddlewares from './middlewares'
import setupRoutes from './routes'

import express, { Application } from 'express'

export default (): Application => {
  const app = express()
  setupMiddlewares(app)
  setupRoutes(app)
  return app
}
