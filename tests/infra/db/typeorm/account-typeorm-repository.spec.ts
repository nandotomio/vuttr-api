import { ormConnection } from './helpers'
import { AccountTypeormRepository, AccountTypeormEntity } from '@/infra/db'
import { mockAddAccountParams } from '@/tests/domain/mocks'
import { EmailInUseError } from '@/domain/errors'

import { Repository, getRepository } from 'typeorm'
import faker from 'faker'

const makeSut = (): AccountTypeormRepository => {
  return new AccountTypeormRepository()
}

let accountRepository: Repository<AccountTypeormEntity>

describe('AccountTypeormRepository', () => {
  beforeAll(async () => {
    await ormConnection.create()
  })

  afterAll(async () => {
    await ormConnection.close()
  })

  beforeEach(async () => {
    accountRepository = getRepository(AccountTypeormEntity)
    await ormConnection.clear()
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
      const fakeAccount = accountRepository.create(addAccountParams)
      await accountRepository.save(fakeAccount)
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
      const fakeAccount = accountRepository.create(addAccountParams)
      await accountRepository.save(fakeAccount)
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
      const fakeAccount = accountRepository.create(mockAddAccountParams())
      await accountRepository.save(fakeAccount)
      expect(fakeAccount.accessToken).toBeFalsy()
      const accessToken = faker.random.uuid()
      await sut.updateAccessToken(fakeAccount.id, accessToken)
      const account = await accountRepository.findOne({ id: fakeAccount.id })
      expect(account).toBeTruthy()
      expect(account.accessToken).toBe(accessToken)
    })
  })
})
