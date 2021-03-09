import { AddAccount, Authentication } from '@/domain/usecases'

import faker from 'faker'

export class AddAccountSpy implements AddAccount {
  callsCount= 0
  params: AddAccount.Params

  async add (params: AddAccount.Params): Promise<void> {
    this.callsCount++
    this.params = params
  }
}

export class AuthenticationSpy implements Authentication {
  params: Authentication.Params
  result = {
    accessToken: faker.random.uuid(),
    name: faker.name.findName()
  }

  async auth (params: Authentication.Params): Promise<Authentication.Result> {
    this.params = params
    return this.result
  }
}
