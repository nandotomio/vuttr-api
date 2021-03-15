require('dotenv').config()

const ormConfig = (dir = 'dist') => ({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  dropSchema: false,
  logging: false,
  synchronize: false,
  migrationsRun: true,
  entities: [
    `./${dir}/infra/db/typeorm/entities/*.{js,ts}`
  ],
  migrations: [`./${dir}/infra/db/typeorm/migrations/*.{js,ts}`],
  cli: {
    entitiesDir: `./${dir}/infra/db/typeorm/entities`,
    migrationsDir: `./${dir}/infra/db/typeorm/migrations`
  }
})

const ormEnvConfig = {
  production: {
    ...ormConfig()
  },
  development: {
    ...ormConfig(),
    url: 'postgres://postgres:postgres@db-postgresql-dev:5432/vuttr-dev'
  },
  test: {
    ...ormConfig('src'),
    url: 'postgres://postgres:postgres@localhost:65432/vuttr-test',
    dropSchema: true
  }
}

module.exports = ormEnvConfig[process.env.NODE_ENV]
