import { config } from 'dotenv'

const envFile = {
  production: '.env',
  development: '.env.dev',
  test: '.env.test'
}

config({
  path: envFile[process.env.NODE_ENV]
})

export default {
  apiPort: process.env.API_PORT,
  jwtSecret: process.env.JWT_SECRET
}
