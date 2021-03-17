import { Express, Router } from 'express'
import { accountRoutes, toolRoutes } from '@/main/routes'

export default (app: Express): void => {
  const router = Router()
  accountRoutes(router)
  toolRoutes(router)
  app.use('/api', router)
}
