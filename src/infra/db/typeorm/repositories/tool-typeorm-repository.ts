import { ToolTypeormEntity, TagTypeormEntity } from '@/infra/db'
import { AddToolRepository, CheckToolByTitleRepository } from '@/data/protocols/db'
import { ToolAlreadyExistsError } from '@/domain/errors'

import { getRepository } from 'typeorm'

export class ToolTypeormRepository implements AddToolRepository, CheckToolByTitleRepository {
  constructor (
    private readonly toolRepository = getRepository(ToolTypeormEntity),
    private readonly tagRepository = getRepository(TagTypeormEntity)
  ) {}

  async add (data: AddToolRepository.Params): Promise<AddToolRepository.Result> {
    const tags = await Promise.all(data.tags.map(async tagName => {
      let tag = await this.tagRepository.findOne({ where: { name: tagName } })
      if (!tag) {
        tag = this.tagRepository.create({ name: tagName })
        await this.tagRepository.save(tag)
      }
      return tag
    }))

    const tool = this.toolRepository.create({
      title: data.title,
      link: data.link,
      description: data.description,
      tags
    })

    await this.toolRepository.save(tool)
    return {
      id: tool.id,
      title: tool.title,
      link: tool.link,
      description: tool.description,
      tags: tool.tags.map(tag => tag.name)
    }
  }

  async checkByTitle (title: string): Promise<void> {
    const exists = await this.toolRepository.findOne({ where: { title } })
    if (exists) {
      throw new ToolAlreadyExistsError()
    }
    return Promise.resolve(null)
  }
}
