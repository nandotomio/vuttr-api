import { AddAccountRepository, CheckAccountByEmailRepository } from '@/data/protocols'

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
