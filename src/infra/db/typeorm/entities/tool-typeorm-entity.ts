import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn, ManyToMany, JoinTable } from 'typeorm'

import { TagTypeormEntity } from '@/infra/db'

@Entity('tools')
export class ToolTypeormEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  title: string

  @Column()
  link: string

  @Column()
  description: string

  @ManyToMany(() => TagTypeormEntity, {
    eager: true,
    cascade: true
  })
  @JoinTable({
    name: 'tool_tags',
    joinColumn: {
      name: 'tool_id'
    },
    inverseJoinColumn: {
      name: 'tag_id'
    }
  })
  tags: TagTypeormEntity[]

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
