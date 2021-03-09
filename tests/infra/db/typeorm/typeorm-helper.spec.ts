import { ormConfig } from './helpers'
import { AccountTypeormEntity } from '@/infra/db'

import { Connection, getMongoRepository, createConnection } from 'typeorm'

describe('Typeorm Helper', () => {
  let db: Connection

  beforeAll(async () => {
    db = await createConnection(ormConfig)
  })

  afterAll(async () => {
    await db.close()
  })

  test('Should reconnect if database is down', async () => {
    let accountRepository = getMongoRepository(AccountTypeormEntity)
    expect(accountRepository).toBeTruthy()
    await db.close()
    accountRepository = getMongoRepository(AccountTypeormEntity)
    expect(accountRepository).toBeTruthy()
  })
})
