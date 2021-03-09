import { AddAccount } from '@/domain/usecases'

export class AddAccountSpy implements AddAccount {
  params: AddAccount.Params

  async add (params: AddAccount.Params): Promise<void> {
    this.params = params
  }
}
