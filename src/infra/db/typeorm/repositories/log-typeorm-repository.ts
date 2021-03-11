import { LogErrorRepository } from '@/data/protocols/db'
import { LogTypeormEntity } from '@/infra/db'

import { getMongoRepository } from 'typeorm'

export class LogTypeormRepository implements LogErrorRepository {
  constructor (
    private readonly ormRepository = getMongoRepository(LogTypeormEntity)
  ) {}

  async logError (stack: string): Promise<void> {
    await this.ormRepository.insertOne({
      stack
    })
  }
}
