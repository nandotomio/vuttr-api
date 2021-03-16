import { AddTool } from '@/domain/usecases'
import { AddToolRepository, CheckToolByTitleRepository } from '@/data/protocols'

export class DbAddTool implements AddTool {
  constructor (
    private readonly addToolRepository: AddToolRepository,
    private readonly checkToolByTitleRepository: CheckToolByTitleRepository
  ) {}

  async add (data: AddTool.Params): Promise<AddTool.Result> {
    await this.checkToolByTitleRepository.checkByTitle(data.title)
    await this.addToolRepository.add(data)
    return Promise.resolve(null)
  }
}
