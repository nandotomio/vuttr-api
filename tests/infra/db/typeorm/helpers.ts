import 'dotenv'

import { ConnectionOptions } from 'typeorm'

export const ormConfig: ConnectionOptions = {
  type: 'mongodb',
  url: process.env.MONGO_URL,
  useNewUrlParser: true,
  synchronize: true,
  logging: true,
  entities: [
    './src/infra/db/typeorm/entities/*.ts'
  ]
}
