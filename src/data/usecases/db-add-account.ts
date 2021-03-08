import { AddAccount } from '@/domain/usecases'
import { Hasher } from '@/data/protocols'

export class DbAddAccount implements AddAccount {
  constructor (
    private readonly hasher: Hasher
  ) {}

  async add (data: AddAccount.Params): Promise<void> {
    await this.hasher.hash(data.password)
  }
}
