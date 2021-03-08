import { AddAccountRepository, CheckAccountByEmailRepository, LoadAccountByEmailRepository, UpdateAccessTokenRepository } from '@/data/protocols'

import faker from 'faker'

export class AddAccountRepositorySpy implements AddAccountRepository {
  callsCount = 0
  params: AddAccountRepository.Params

  async add (params: AddAccountRepository.Params): Promise<void> {
    this.callsCount++
    this.params = params
  }
}

export class CheckAccountByEmailRepositorySpy implements CheckAccountByEmailRepository {
  email: string

  async checkByEmail (email: string): Promise<void> {
    this.email = email
  }
}

export class LoadAccountByEmailRepositorySpy implements LoadAccountByEmailRepository {
  email: string
  result = {
    id: faker.random.uuid(),
    name: faker.name.findName(),
    password: faker.internet.password()
  }

  async loadByEmail (email: string): Promise<LoadAccountByEmailRepository.Result> {
    this.email = email
    return this.result
  }
}

export class UpdateAccessTokenRepositorySpy implements UpdateAccessTokenRepository {
  id: string
  token: string

  async updateAccessToken (id: string, token: string): Promise<void> {
    this.id = id
    this.token = token
  }
}
