import { ormConnection } from './helpers'

import { LogTypeormRepository, LogTypeormEntity } from '@/infra/db'

import { Repository, getRepository } from 'typeorm'
import faker from 'faker'

const makeSut = (): LogTypeormRepository => {
  return new LogTypeormRepository()
}

let errorRepository: Repository<LogTypeormEntity>

describe('LogTypeormRepository', () => {
  beforeAll(async () => {
    await ormConnection.create()
  })

  afterAll(async () => {
    await ormConnection.close()
  })

  beforeEach(async () => {
    errorRepository = getRepository(LogTypeormEntity)
    await ormConnection.clear()
  })

  test('Should create an error log on success', async () => {
    const sut = makeSut()
    await sut.logError(faker.random.words())
    const count = await errorRepository.count()
    expect(count).toBe(1)
  })
})
