import { AddToolController } from '@/presentation/controllers'
import { MissingParamError } from '@/presentation/errors'
import { badRequest } from '@/presentation/helpers'
import { ValidationSpy, AddToolSpy } from '@/tests/presentation/mocks'
import { mockAddToolParams } from '@/tests/domain/mocks'

import faker from 'faker'

const mockRequest = (): AddToolController.Request => {
  return mockAddToolParams()
}

type SutTypes = {
  sut: AddToolController
  validationSpy: ValidationSpy
  addToolSpy: AddToolSpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const addToolSpy = new AddToolSpy()
  const sut = new AddToolController(validationSpy, addToolSpy)
  return {
    sut,
    validationSpy,
    addToolSpy
  }
}

describe('AddTool Controller', () => {
  test('Should call Validation with correct value', async () => {
    const { sut, validationSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(validationSpy.input).toEqual(request)
  })

  test('Should return 400 if Validation returns an error', async () => {
    const { sut, validationSpy } = makeSut()
    validationSpy.error = new MissingParamError(faker.random.word())
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(badRequest(validationSpy.error))
  })

  test('Should call AddTool with correct values', async () => {
    const { sut, addToolSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(addToolSpy.params).toEqual({
      title: request.title,
      link: request.link,
      description: request.description,
      tags: request.tags
    })
  })
})
