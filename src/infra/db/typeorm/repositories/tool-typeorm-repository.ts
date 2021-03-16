import { AddToolRepository } from '@/data/protocols/db'
import { ToolTypeormEntity, TagTypeormEntity } from '@/infra/db'

import { getRepository } from 'typeorm'

export class ToolTypeormRepository implements AddToolRepository {
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
    return Promise.resolve(null)
  }
}
