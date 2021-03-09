import { AddAccount } from '@/domain/usecases'

export class AddAccountSpy implements AddAccount {
  callsCount= 0
  params: AddAccount.Params

  async add (params: AddAccount.Params): Promise<void> {
    this.callsCount++
    this.params = params
  }
}
