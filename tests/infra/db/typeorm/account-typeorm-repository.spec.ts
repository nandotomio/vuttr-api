import { ormConfig } from './helpers'
import { AccountMongoRepository, AccountTypeormEntity } from '@/infra/db'
import { mockAddAccountParams } from '@/tests/domain/mocks'

import { Connection, createConnection, MongoRepository } from 'typeorm'

const makeSut = (): AccountMongoRepository => {
  return new AccountMongoRepository()
}

let dbConnection: Connection
let accountRepository: MongoRepository<AccountTypeormEntity>

describe('AccountMongoRepository', () => {
  beforeAll(async () => {
    dbConnection = await createConnection(ormConfig)
  })

  afterAll(async () => {
    await dbConnection.close()
  })

  beforeEach(async () => {
    accountRepository = dbConnection.getMongoRepository(AccountTypeormEntity)
    await accountRepository.deleteMany({})
  })

  describe('add()', () => {
    test('Should add an account on success', async () => {
      const sut = makeSut()
      const addAccountParams = mockAddAccountParams()
      await sut.add(addAccountParams)
      const count = await accountRepository.count({ email: addAccountParams.email })
      expect(count).toBe(1)
    })
  })
})
