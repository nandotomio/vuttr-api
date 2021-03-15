import { LogErrorRepository } from '@/data/protocols/db'
import { LogTypeormEntity } from '@/infra/db'

import { getRepository } from 'typeorm'

export class LogTypeormRepository implements LogErrorRepository {
  constructor (
    private readonly ormRepository = getRepository(LogTypeormEntity)
  ) {}

  async logError (stack: string): Promise<void> {
    const log = this.ormRepository.create({
      stack
    })
    await this.ormRepository.save(log)
  }
}
