import { Controller, HttpResponse, Validation } from '@/presentation/protocols'
import { badRequest, created, forbidden, serverError } from '@/presentation/helpers'
import { AddTool } from '@/domain/usecases'
import { ToolAlreadyExistsError } from '@/domain/errors'

export class AddToolController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly addTool: AddTool
  ) {}

  async handle (request: AddToolController.Request): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request)
      if (error) {
        return badRequest(error)
      }
      const tool = await this.addTool.add(request)
      return created(tool)
    } catch (error) {
      if (error instanceof ToolAlreadyExistsError) {
        return forbidden(error)
      }
      return serverError(error)
    }
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