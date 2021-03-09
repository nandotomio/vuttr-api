import { Controller, HttpResponse, Validation } from '@/presentation/protocols'
import { badRequest, forbidden } from '@/presentation/helpers'
import { AddAccount } from '@/domain/usecases'

import { EmailInUseError } from '@/domain/errors'

export class SignUpController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly addAccount: AddAccount
  ) {}

  async handle (request: SignUpController.Request): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request)
      if (error) {
        return badRequest(error)
      }
      const { name, email, password } = request
      await this.addAccount.add({
        name,
        email,
        password
      })
      return null
    } catch (error) {
      switch (error.constructor) {
        case EmailInUseError: return forbidden(error)
        default: return error
      }
    }
  }
}

export namespace SignUpController {
  export type Request = {
    name: string
    email: string
    password: string
    passwordConfirmation: string
  }
}