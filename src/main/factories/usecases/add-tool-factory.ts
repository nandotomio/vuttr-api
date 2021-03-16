import { DbAddTool } from '@/data/usecases'
import { AddTool } from '@/domain/usecases'
import { ToolTypeormRepository } from '@/infra/db'

export const makeDbAddTool = (): AddTool => {
  const accountTypeormRepository = new ToolTypeormRepository()
  return new DbAddTool(accountTypeormRepository, accountTypeormRepository)
}
