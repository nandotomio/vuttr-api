import { ormConnection } from './helpers'
import { ToolTypeormRepository, ToolTypeormEntity } from '@/infra/db'
import { mockAddToolParams } from '@/tests/domain/mocks'

import { Repository, getRepository } from 'typeorm'

const makeSut = (): ToolTypeormRepository => {
  return new ToolTypeormRepository()
}

let toolRepository: Repository<ToolTypeormEntity>

describe('ToolTypeormRepository', () => {
  beforeAll(async () => {
    await ormConnection.create()
  })

  afterAll(async () => {
    await ormConnection.close()
  })

  beforeEach(async () => {
    toolRepository = getRepository(ToolTypeormEntity)
    await ormConnection.clear()
  })

  describe('add()', () => {
    test('Should add a tool on success', async () => {
      const sut = makeSut()
      const addToolParams = mockAddToolParams()
      await sut.add(addToolParams)
      const count = await toolRepository.count()
      expect(count).toBe(1)
    })
  })
})
