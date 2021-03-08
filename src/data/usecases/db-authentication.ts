import { Authentication } from '@/domain/usecases'
import { LoadAccountByEmailRepository, HashComparer, Encrypter } from '@/data/protocols'

export class DbAuthentication implements Authentication {
  constructor (
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly hashComparer: HashComparer,
    private readonly encrypter: Encrypter
  ) {}

  async auth (data: Authentication.Params): Promise<Authentication.Result> {
    const { email, password } = data
    const account = await this.loadAccountByEmailRepository.loadByEmail(email)
    if (account) {
      const isValid = await this.hashComparer.compare(password, account.password)
      if (isValid) {
        await this.encrypter.encrypt(account.id)
        return null
      }
    }
    return null
  }
}
