import { AddAccountRepository, CheckAccountByEmailRepository } from '@/data/protocols'

export class AddAccountRepositorySpy implements AddAccountRepository {
  params: AddAccountRepository.Params

  async add (params: AddAccountRepository.Params): Promise<void> {
    this.params = params
  }
}

export class CheckAccountByEmailRepositorySpy implements CheckAccountByEmailRepository {
  email: string
  result = false

  async checkByEmail (email: string): Promise<void> {
    this.email = email
  }
}
