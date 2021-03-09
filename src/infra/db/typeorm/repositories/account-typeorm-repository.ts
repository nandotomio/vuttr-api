import { AddAccountRepository, CheckAccountByEmailRepository } from '@/data/protocols/db'
import { AccountTypeormEntity } from '@/infra/db'
import { EmailInUseError } from '@/domain/errors'

import { getMongoRepository } from 'typeorm'

export class AccountMongoRepository implements AddAccountRepository, CheckAccountByEmailRepository {
  constructor (
    private readonly ormRepository = getMongoRepository(AccountTypeormEntity)
  ) {}

  async add (data: AddAccountRepository.Params): Promise<void> {
    await this.ormRepository.insertOne(data)
  }

  async checkByEmail (email: string): Promise<void> {
    const account = await this.ormRepository.findOne({ email })
    if (account) {
      throw new EmailInUseError()
    }
  }
}
