import { AddAccountRepository, CheckAccountByEmailRepository, LoadAccountByEmailRepository, UpdateAccessTokenRepository } from '@/data/protocols/db'
import { AccountTypeormEntity } from '@/infra/db'
import { EmailInUseError } from '@/domain/errors'

import { getRepository } from 'typeorm'

export class AccountTypeormRepository implements AddAccountRepository, CheckAccountByEmailRepository, LoadAccountByEmailRepository, UpdateAccessTokenRepository {
  constructor (
    private readonly ormRepository = getRepository(AccountTypeormEntity)
  ) {}

  async add (data: AddAccountRepository.Params): Promise<void> {
    const account = this.ormRepository.create(data)
    await this.ormRepository.save(account)
  }

  async checkByEmail (email: string): Promise<void> {
    const account = await this.ormRepository.findOne({ email })
    if (account) {
      throw new EmailInUseError()
    }
  }

  async loadByEmail (email: string): Promise<LoadAccountByEmailRepository.Result> {
    const account = await this.ormRepository.findOne({ email }, {
      select: ['id', 'name', 'password']
    })
    if (!account) {
      return null
    }
    return {
      id: account.id,
      name: account.name,
      password: account.password
    }
  }

  async updateAccessToken (id: string, token: string): Promise<void> {
    await this.ormRepository.update({ id }, { accessToken: token })
  }
}
