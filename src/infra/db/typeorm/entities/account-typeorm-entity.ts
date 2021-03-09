import { AddAccount } from '@/domain/usecases'

import { Entity, ObjectID, ObjectIdColumn, Column, UpdateDateColumn, CreateDateColumn } from 'typeorm'

@Entity('accounts')
export class AccountTypeormEntity implements AddAccount.Params {
  @ObjectIdColumn()
  id: ObjectID

  @Column()
  email: string

  @Column()
  name: string

  @Column()
  password: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
