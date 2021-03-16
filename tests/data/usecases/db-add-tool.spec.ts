import { DbAddTool } from '@/data/usecases'
import { mockAddToolParams } from '@/tests/domain/mocks'
import { AddToolRepositorySpy } from '@/tests/data/mocks'

type SutTypes = {
  sut: DbAddTool
  addToolRepositorySpy: AddToolRepositorySpy
}

const makeSut = (): SutTypes => {
  const addToolRepositorySpy = new AddToolRepositorySpy()
  const sut = new DbAddTool(addToolRepositorySpy)
  return {
    sut,
    addToolRepositorySpy
  }
}

describe('DbAddTool Usecase', () => {
  test('Should call AddToolRepository with correct values', async () => {
    const { sut, addToolRepositorySpy } = makeSut()
    const addToolParams = mockAddToolParams()
    await sut.add(addToolParams)
    expect(addToolRepositorySpy.params).toEqual({
      title: addToolParams.title,
      link: addToolParams.link,
      description: addToolParams.description,
      tags: addToolParams.tags
    })
  })
})
