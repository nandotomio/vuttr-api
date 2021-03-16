import { DbAddTool } from '@/data/usecases'
import { mockAddToolParams, throwError } from '@/tests/domain/mocks'
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

  test('Should throw if AddToolRepository throws', async () => {
    const { sut, addToolRepositorySpy } = makeSut()
    jest.spyOn(addToolRepositorySpy, 'add').mockImplementationOnce(throwError)
    const promise = sut.add(mockAddToolParams())
    await expect(promise).rejects.toThrow()
  })
})
