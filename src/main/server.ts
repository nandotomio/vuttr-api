import 'reflect-metadata'
import 'module-alias/register'
import 'dotenv/config'
import env from '@/main/config/env'
import makeApp from '@/main/config/app'

import { createConnection } from 'typeorm'

createConnection()
  .then(async () => {
    const app = makeApp()
    app.listen(env.apiPort, () => console.log(`Server running at http://localhost:${env.apiPort}`))
  })
  .catch(console.error)
