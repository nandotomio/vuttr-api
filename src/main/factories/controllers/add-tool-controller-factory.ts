import { makeAddToolValidation, makeDbAddTool, makeLogControllerDecorator } from '@/main/factories'
import { AddToolController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'

export const makeAddToolController = (): Controller => {
  const controller = new AddToolController(makeAddToolValidation(), makeDbAddTool())
  return makeLogControllerDecorator(controller)
}
