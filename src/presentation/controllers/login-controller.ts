import { Controller, HttpResponse, Validation } from '@/presentation/protocols'

export class LoginController implements Controller {
  constructor (
    private readonly validation: Validation
  ) {}

  async handle (request: LoginController.Request): Promise<HttpResponse> {
    this.validation.validate(request)
    return Promise.resolve(null)
  }
}

export namespace LoginController {
  export type Request = {
    email: string
    password: string
  }
}
