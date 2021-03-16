import { adaptRoute } from '@/main/adapters'
import { makeAddToolController } from '@/main/factories'

import { Router } from 'express'

export default (router: Router): void => {
  router.post('/tools', adaptRoute(makeAddToolController()))
}
