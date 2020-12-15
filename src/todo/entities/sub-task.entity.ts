import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
} from 'typeorm'
import TaskEntity from './task.entity'

@Entity()
export default class SubTaskEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  title: string

  @Column()
  done: boolean

  @ManyToOne(() => TaskEntity, (task) => task.subTasks)
  parentTask: TaskEntity
}
