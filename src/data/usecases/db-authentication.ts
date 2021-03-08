import { Authentication } from '@/domain/usecases'
import { LoadAccountByEmailRepository, HashComparer } from '@/data/protocols'

export class DbAuthentication implements Authentication {
  constructor (
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly hashComparer: HashComparer
  ) {}

  async auth (data: Authentication.Params): Promise<Authentication.Result> {
    const { email, password } = data
    const account = await this.loadAccountByEmailRepository.loadByEmail(email)
    if (account) {
      await this.hashComparer.compare(password, account.password)
    }
    return null
  }
}
