import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm'

@Entity('errors')
export class LogTypeormEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  stack: string

  @CreateDateColumn()
  createdAt: Date
}
