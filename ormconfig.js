require('dotenv').config()

const appDir = process.env.NODE_ENV === 'PROD' ? 'dist' : 'src'

module.exports = {
  type: 'mongodb',
  host: process.env.MONGODB_HOST,
  port: Number(process.env.MONGODB_PORT),
  database: process.env.MONGODB_DATABASE,
  username: process.env.MONGODB_USERNAME,
  password: process.env.MONGODB_PASSWORD,
  useUnifiedTopology: true,
  synchronize: true,
  entities: [
    `./${appDir}/infra/db/typeorm/entities/*{.ts,.js}`
  ]
}
