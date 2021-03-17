import { AddToolRepository, CheckToolByTitleRepository } from '@/data/protocols'
import { mockAddToolParams } from '@/tests/domain/mocks'

import faker from 'faker'

export class AddToolRepositorySpy implements AddToolRepository {
  callsCount = 0
  params: AddToolRepository.Params
  result: AddToolRepository.Result = {
    ...mockAddToolParams(),
    id: faker.random.uuid()
  }

  async add (params: AddToolRepository.Params): Promise<AddToolRepository.Result> {
    this.callsCount++
    this.params = params
    return this.result
  }
}

export class CheckToolByTitleRepositorySpy implements CheckToolByTitleRepository {
  title: string

  async checkByTitle (title: string): Promise<void> {
    this.title = title
  }
}
