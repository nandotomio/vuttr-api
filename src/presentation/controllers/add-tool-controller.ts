import { Controller, HttpResponse, Validation } from '@/presentation/protocols'
import { badRequest } from '@/presentation/helpers'

export class AddToolController implements Controller {
  constructor (
    private readonly validation: Validation
  ) {}

  async handle (request: AddToolController.Request): Promise<HttpResponse> {
    const error = this.validation.validate(request)
    if (error) {
      return badRequest(error)
    }
    return Promise.resolve(null)
  }
}

export namespace AddToolController {
  export type Request = {
    title: string
    link: string
    description: string
    tags: string[]
  }
}
