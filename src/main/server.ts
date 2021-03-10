import 'reflect-metadata'
import 'dotenv/config'
import 'module-alias/register'
import env from '@/main/config/env'
import { createConnection } from 'typeorm'

createConnection()
  .then(async () => {
    const app = (await import('./config/app')).default
    app.listen(env.port, () => console.log(`Server running at http://localhost:${env.port}`))
  })
  .catch(console.error)
