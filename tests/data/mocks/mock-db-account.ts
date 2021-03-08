import { AddAccountRepository } from '@/data/protocols'

export class AddAccountRepositorySpy implements AddAccountRepository {
  params: AddAccountRepository.Params

  async add (params: AddAccountRepository.Params): Promise<void> {
    this.params = params
  }
}
