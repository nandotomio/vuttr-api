import { makeDbAuthentication, makeSignUpValidation, makeDbAddAccount } from '@/main/factories'
import { SignUpController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'

export const makeSignUpController = (): Controller => {
  return new SignUpController(makeSignUpValidation(), makeDbAddAccount(), makeDbAuthentication())
}
