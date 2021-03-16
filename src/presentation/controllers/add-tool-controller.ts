import { Controller, HttpResponse, Validation } from '@/presentation/protocols'

export class AddToolController implements Controller {
  constructor (
    private readonly validation: Validation
  ) {}

  async handle (request: AddToolController.Request): Promise<HttpResponse> {
    this.validation.validate(request)
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
