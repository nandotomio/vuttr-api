import { AddToolController } from '@/presentation/controllers'
import { MissingParamError, ServerError } from '@/presentation/errors'
import { badRequest, created, forbidden, serverError } from '@/presentation/helpers'
import { ValidationSpy, AddToolSpy } from '@/tests/presentation/mocks'
import { mockAddToolParams, throwError } from '@/tests/domain/mocks'
import { ToolAlreadyExistsError } from '@/domain/errors'

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

  test('Should return 403 if AddTool throws ToolAlreadyExistsError', async () => {
    const { sut, addToolSpy } = makeSut()
    jest.spyOn(addToolSpy, 'add').mockRejectedValueOnce(new ToolAlreadyExistsError())
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(forbidden(new ToolAlreadyExistsError()))
  })

  test('Should return 500 if AddTool throws', async () => {
    const { sut, addToolSpy } = makeSut()
    jest.spyOn(addToolSpy, 'add').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new ServerError(null)))
  })

  test('Should not call AddTool if Validation fails', async () => {
    const { sut, validationSpy, addToolSpy } = makeSut()
    validationSpy.error = new MissingParamError(faker.random.word())
    await sut.handle(mockRequest())
    expect(addToolSpy.callsCount).toBe(0)
  })

  test('Should return 201 if valid data is provided', async () => {
    const { sut, addToolSpy } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(created(addToolSpy.result))
  })
})
