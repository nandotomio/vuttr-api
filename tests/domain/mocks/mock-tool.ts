import { AddTool } from '@/domain/usecases'

import faker from 'faker'

export const mockAddToolParams = (): AddTool.Params => ({
  title: faker.random.word(),
  link: faker.internet.url(),
  description: faker.lorem.paragraphs(),
  tags: faker.random.arrayElements()
})
