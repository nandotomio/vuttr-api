import { DbAddAccount } from '@/data/usecases'
import { AddAccount } from '@/domain/usecases'
import { AccountTypeormRepository } from '@/infra/db'
import { BcryptAdapter } from '@/infra/cryptography'

export const makeDbAddAccount = (): AddAccount => {
  const salt = 12
  const bcryptAdapter = new BcryptAdapter(salt)
  const accountTypeormRepository = new AccountTypeormRepository()
  return new DbAddAccount(accountTypeormRepository, bcryptAdapter, accountTypeormRepository)
}
