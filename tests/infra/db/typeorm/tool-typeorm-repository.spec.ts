import { ormConnection } from './helpers'
import { ToolTypeormRepository, ToolTypeormEntity, TagTypeormEntity } from '@/infra/db'
import { mockAddToolParams } from '@/tests/domain/mocks'
import { ToolAlreadyExistsError } from '@/domain/errors'

import { Repository, getRepository } from 'typeorm'

const makeSut = (): ToolTypeormRepository => {
  return new ToolTypeormRepository()
}

let toolRepository: Repository<ToolTypeormEntity>
let tagRepository: Repository<TagTypeormEntity>

describe('ToolTypeormRepository', () => {
  beforeAll(async () => {
    await ormConnection.create()
  })

  afterAll(async () => {
    await ormConnection.close()
  })

  beforeEach(async () => {
    toolRepository = getRepository(ToolTypeormEntity)
    tagRepository = getRepository(TagTypeormEntity)
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

    test('Should return a tool on success', async () => {
      const sut = makeSut()
      const addToolParams = mockAddToolParams()
      const tool = await sut.add(addToolParams)
      expect(tool.id).toBeTruthy()
      expect(tool.title).toBe(addToolParams.title)
      expect(tool.link).toBe(addToolParams.link)
      expect(tool.description).toBe(addToolParams.description)
      expect(tool.tags).toEqual(addToolParams.tags)
    })
  })

  describe('checkByTitle()', () => {
    test('Should throw ToolAlreadyExistsError if title already in use', async () => {
      const sut = makeSut()
      const addToolParams = mockAddToolParams()
      const tags = await Promise.all(addToolParams.tags.map(async tagName => {
        let tag = await tagRepository.findOne({ where: { name: tagName } })
        if (!tag) {
          tag = tagRepository.create({ name: tagName })
          await tagRepository.save(tag)
        }
        return tag
      }))

      const fakeTool = toolRepository.create({
        title: addToolParams.title,
        link: addToolParams.link,
        description: addToolParams.description,
        tags
      })
      const fakeAccount = toolRepository.create(fakeTool)
      await toolRepository.save(fakeAccount)
      const promise = sut.checkByTitle(addToolParams.title)
      await expect(promise).rejects.toThrow(ToolAlreadyExistsError)
    })
  })
})
