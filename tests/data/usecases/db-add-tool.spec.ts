import { DbAddTool } from '@/data/usecases'
import { mockAddToolParams, throwError } from '@/tests/domain/mocks'
import { AddToolRepositorySpy, CheckToolByTitleRepositorySpy } from '@/tests/data/mocks'

type SutTypes = {
  sut: DbAddTool
  addToolRepositorySpy: AddToolRepositorySpy
  checkToolByTitleRepositorySpy: CheckToolByTitleRepositorySpy
}

const makeSut = (): SutTypes => {
  const addToolRepositorySpy = new AddToolRepositorySpy()
  const checkToolByTitleRepositorySpy = new CheckToolByTitleRepositorySpy()
  const sut = new DbAddTool(addToolRepositorySpy, checkToolByTitleRepositorySpy)
  return {
    sut,
    addToolRepositorySpy,
    checkToolByTitleRepositorySpy
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

  test('Should call CheckToolByTitleRepository with correct value', async () => {
    const { sut, checkToolByTitleRepositorySpy } = makeSut()
    const addAccountParams = mockAddToolParams()
    await sut.add(addAccountParams)
    expect(checkToolByTitleRepositorySpy.title).toBe(addAccountParams.title)
  })

  test('Should throw if CheckToolByTitleRepository throws', async () => {
    const { sut, checkToolByTitleRepositorySpy } = makeSut()
    jest.spyOn(checkToolByTitleRepositorySpy, 'checkByTitle').mockImplementationOnce(throwError)
    const promise = sut.add(mockAddToolParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should not call AddToolRepository if CheckToolByTitleRepository fails', async () => {
    const { sut, checkToolByTitleRepositorySpy, addToolRepositorySpy } = makeSut()
    jest.spyOn(checkToolByTitleRepositorySpy, 'checkByTitle').mockImplementationOnce(throwError)
    const promise = sut.add(mockAddToolParams())
    await expect(promise).rejects.toThrow()
    expect(addToolRepositorySpy.callsCount).toBe(0)
  })
})
