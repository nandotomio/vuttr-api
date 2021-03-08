import { Authentication } from '@/domain/usecases'
import { LoadAccountByEmailRepository } from '@/data/protocols'

export class DbAuthentication implements Authentication {
  constructor (
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository
  ) {}

  async auth (data: Authentication.Params): Promise<Authentication.Result> {
    const { email } = data
    await this.loadAccountByEmailRepository.loadByEmail(email)
    return Promise.resolve(null)
  }
}
