import { LogControllerDecorator } from '@/main/decorators'
import { LogTypeormRepository } from '@/infra/db'
import { Controller } from '@/presentation/protocols'

export const makeLogControllerDecorator = (controller: Controller): Controller => {
  const logTypeormRepository = new LogTypeormRepository()
  return new LogControllerDecorator(controller, logTypeormRepository)
}
