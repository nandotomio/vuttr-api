import { AddAccount } from '@/domain/usecases'
import { Hasher, AddAccountRepository } from '@/data/protocols'

export class DbAddAccount implements AddAccount {
  constructor (
    private readonly hasher: Hasher,
    private readonly addAccountRepository: AddAccountRepository
  ) {}

  async add (data: AddAccount.Params): Promise<void> {
    const { email, name, password } = data

    const hashedPassword = await this.hasher.hash(password)
    await this.addAccountRepository.add({
      email,
      name,
      password: hashedPassword
    })
  }
}
