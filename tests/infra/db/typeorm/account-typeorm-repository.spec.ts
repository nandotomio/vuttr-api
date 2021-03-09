import { ormConfig } from './helpers'
import { AccountMongoRepository, AccountTypeormEntity } from '@/infra/db'
import { mockAddAccountParams } from '@/tests/domain/mocks'
import { EmailInUseError } from '@/domain/errors'

import { Connection, createConnection, MongoRepository } from 'typeorm'
import faker from 'faker'

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

    test('Should resolve on success', async () => {
      const sut = makeSut()
      const addAccountParams = mockAddAccountParams()
      const promise = sut.add(addAccountParams)
      await expect(promise).resolves.toBeUndefined()
    })
  })

  describe('checkByEmail()', () => {
    test('Should throw EmailInUseError if email already in use', async () => {
      const sut = makeSut()
      const addAccountParams = mockAddAccountParams()
      await accountRepository.insertOne(addAccountParams)
      const promise = sut.checkByEmail(addAccountParams.email)
      await expect(promise).rejects.toThrow(EmailInUseError)
    })

    test('Should resolve if email is valid', async () => {
      const sut = makeSut()
      const addAccountParams = mockAddAccountParams()
      const promise = sut.checkByEmail(addAccountParams.email)
      await expect(promise).resolves.toBeUndefined()
    })
  })

  describe('loadByEmail()', () => {
    test('Should return an account on success', async () => {
      const sut = makeSut()
      const addAccountParams = mockAddAccountParams()
      await accountRepository.insertOne(addAccountParams)
      const account = await sut.loadByEmail(addAccountParams.email)
      expect(account).toBeTruthy()
      expect(account.id).toBeTruthy()
      expect(account.name).toBe(addAccountParams.name)
      expect(account.password).toBe(addAccountParams.password)
    })

    test('Should return null if loadByEmail fails', async () => {
      const sut = makeSut()
      const account = await sut.loadByEmail(faker.internet.email())
      expect(account).toBeFalsy()
    })
  })

  describe('updateAccessToken()', () => {
    test('Should update the account accessToken on success', async () => {
      const sut = makeSut()
      const res = await accountRepository.insertOne(mockAddAccountParams())
      const fakeAccount = res.ops[0]
      expect(fakeAccount.accessToken).toBeFalsy()
      const accessToken = faker.random.uuid()
      await sut.updateAccessToken(fakeAccount.id, accessToken)
      const account = await accountRepository.findOne({ id: fakeAccount.id })
      expect(account).toBeTruthy()
      expect(account.accessToken).toBe(accessToken)
    })
  })
})
