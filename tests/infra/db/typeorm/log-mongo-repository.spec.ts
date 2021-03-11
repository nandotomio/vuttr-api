import { ormConfig } from './helpers'

import { LogTypeormRepository, LogTypeormEntity } from '@/infra/db'

import { Connection, createConnection, MongoRepository } from 'typeorm'
import faker from 'faker'

const makeSut = (): LogTypeormRepository => {
  return new LogTypeormRepository()
}

let dbConnection: Connection
let errorRepository: MongoRepository<LogTypeormEntity>

describe('LogTypeormRepository', () => {
  beforeAll(async () => {
    dbConnection = await createConnection(ormConfig)
  })

  afterAll(async () => {
    await dbConnection.close()
  })

  beforeEach(async () => {
    errorRepository = dbConnection.getMongoRepository(LogTypeormEntity)
    await errorRepository.deleteMany({})
  })

  test('Should create an error log on success', async () => {
    const sut = makeSut()
    await sut.logError(faker.random.words())
    const count = await errorRepository.count()
    expect(count).toBe(1)
  })
})
