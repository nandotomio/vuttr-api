import { ormConnection } from './helpers'
import { AccountTypeormEntity } from '@/infra/db'

import { getRepository } from 'typeorm'

describe('Typeorm Helper', () => {
  beforeAll(async () => {
    await ormConnection.create()
  })

  afterAll(async () => {
    await ormConnection.close()
  })

  beforeEach(async () => {
    await ormConnection.clear()
  })

  test('Should reconnect if database is down', async () => {
    let accountRepository = getRepository(AccountTypeormEntity)
    expect(accountRepository).toBeTruthy()
    await ormConnection.close()
    accountRepository = getRepository(AccountTypeormEntity)
    expect(accountRepository).toBeTruthy()
  })
})
