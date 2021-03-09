import { Controller, HttpResponse, Validation } from '@/presentation/protocols'
import { badRequest, forbidden, serverError } from '@/presentation/helpers'
import { AddAccount, Authentication } from '@/domain/usecases'

import { EmailInUseError } from '@/domain/errors'

export class SignUpController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly addAccount: AddAccount,
    private readonly authentication: Authentication
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
      await this.authentication.auth({
        email,
        password
      })
      return null
    } catch (error) {
      if (error instanceof EmailInUseError) {
        return forbidden(error)
      }
      return serverError(error)
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
