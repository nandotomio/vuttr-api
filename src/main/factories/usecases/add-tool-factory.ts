import { DbAddTool } from '@/data/usecases'
import { AddTool } from '@/domain/usecases'
import { ToolTypeormRepository } from '@/infra/db'

export const makeDbAddTool = (): AddTool => {
  const toolTypeormRepository = new ToolTypeormRepository()
  return new DbAddTool(toolTypeormRepository, toolTypeormRepository)
}
