import { Entity, ObjectID, ObjectIdColumn, Column, CreateDateColumn } from 'typeorm'

@Entity('errors')
export class LogTypeormEntity {
  @ObjectIdColumn()
  id: ObjectID

  @Column()
  stack: string

  @CreateDateColumn()
  createdAt: Date
}
