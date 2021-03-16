import { AddTool } from '@/domain/usecases'
import { AddToolRepository } from '@/data/protocols'

export class DbAddTool implements AddTool {
  constructor (
    private readonly addToolRepository: AddToolRepository
  ) {}

  async add (data: AddTool.Params): Promise<AddTool.Result> {
    await this.addToolRepository.add(data)
    return Promise.resolve(null)
  }
}
