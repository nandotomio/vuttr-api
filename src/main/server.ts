import 'module-alias/register'
import 'reflect-metadata'
import 'dotenv/config'
import env from '@/main/config/env'
import { createConnection } from 'typeorm'

createConnection()
  .then(async () => {
    const app = (await import('./config/app')).default
    app.listen(env.apiPort, () => console.log(`Server running at http://localhost:${env.apiPort}`))
  })
  .catch(console.error)
