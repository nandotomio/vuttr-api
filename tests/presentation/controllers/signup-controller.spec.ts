import { SignUpController } from '@/presentation/controllers'
import { MissingParamError } from '@/presentation/errors'
import { badRequest } from '@/presentation/helpers'
import { ValidationSpy, AddAccountSpy } from '@/tests/presentation/mocks'

import faker from 'faker'

const mockRequest = (): SignUpController.Request => {
  const password = faker.internet.password()
  return {
    name: faker.name.findName(),
    email: faker.internet.email(),
    password,
    passwordConfirmation: password
  }
}

type SutTypes = {
  sut: SignUpController
  validationSpy: ValidationSpy
  addAccountSpy: AddAccountSpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const addAccountSpy = new AddAccountSpy()
  const sut = new SignUpController(validationSpy, addAccountSpy)
  return {
    sut,
    validationSpy,
    addAccountSpy
  }
}

describe('SignUp Controller', () => {
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

  test('Should call AddAccount with correct values', async () => {
    const { sut, addAccountSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(addAccountSpy.params).toEqual({
      name: request.name,
      email: request.email,
      password: request.password
    })
  })
})