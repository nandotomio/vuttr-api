import { AddTool } from '@/domain/usecases'
import { mockAddToolParams } from '@/tests/domain/mocks'

import faker from 'faker'

export class AddToolSpy implements AddTool {
  callsCount = 0
  params: AddTool.Params
  result: AddTool.Result = {
    ...mockAddToolParams(),
    id: faker.random.uuid()
  }

  async add (params: AddTool.Params): Promise<AddTool.Result> {
    this.callsCount++
    this.params = params
    return this.result
  }
}
