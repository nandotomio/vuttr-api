import { AddAccountRepository } from '@/data/protocols/db'
import { AccountTypeormEntity } from '@/infra/db'

import { getMongoRepository } from 'typeorm'

export class AccountMongoRepository implements AddAccountRepository {
  constructor (
    private readonly ormRepository = getMongoRepository(AccountTypeormEntity)
  ) {}

  async add (data: AddAccountRepository.Params): Promise<void> {
    await this.ormRepository.insertOne(data)
  }
}
