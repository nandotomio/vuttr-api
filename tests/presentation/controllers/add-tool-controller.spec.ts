import { AddToolController } from '@/presentation/controllers'
import { ValidationSpy } from '@/tests/presentation/mocks'
import { mockAddToolParams } from '@/tests/domain/mocks'

const mockRequest = (): AddToolController.Request => {
  return mockAddToolParams()
}

type SutTypes = {
  sut: AddToolController
  validationSpy: ValidationSpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const sut = new AddToolController(validationSpy)
  return {
    sut,
    validationSpy
  }
}

describe('AddTool Controller', () => {
  test('Should call Validation with correct value', async () => {
    const { sut, validationSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(validationSpy.input).toEqual(request)
  })
})
