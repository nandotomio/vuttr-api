import { AddToolRepository } from '@/data/protocols'
import { mockAddToolParams } from '@/tests/domain/mocks'

import faker from 'faker'

export class AddToolRepositorySpy implements AddToolRepository {
  params: AddToolRepository.Params
  result: AddToolRepository.Result = {
    ...mockAddToolParams(),
    id: faker.random.uuid(),
    createdAt: faker.date.recent(),
    updatedAt: faker.date.recent()
  }

  async add (params: AddToolRepository.Params): Promise<AddToolRepository.Result> {
    this.params = params
    return this.result
  }
}
