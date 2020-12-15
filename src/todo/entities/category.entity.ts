import { Entity, BaseEntity, OneToMany, PrimaryColumn } from 'typeorm'
import TaskEntity from './task.entity'

@Entity()
export default class CategoryEntity extends BaseEntity {
  @PrimaryColumn()
  name: string

  @OneToMany(() => TaskEntity, (task) => task.category)
  tasks: TaskEntity[]
}
