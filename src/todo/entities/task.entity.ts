import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm'
import CategoryEntity from './category.entity'
import SubTaskEntity from './sub-task.entity'
import LabelEntity from './label.entity'
import { UserEntity } from '../../user/entities'

@Entity()
export default class TaskEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ length: 50 })
  title: string

  @Column({ length: 500, nullable: true })
  description: string

  @Column({ default: false })
  done: boolean

  @ManyToOne(() => CategoryEntity, (category) => category.tasks)
  category: CategoryEntity

  @OneToMany(() => SubTaskEntity, (subTask) => subTask.parentTask)
  subTasks: SubTaskEntity[]

  @ManyToMany(() => LabelEntity)
  @JoinTable()
  labels: LabelEntity[]

  @ManyToOne(() => UserEntity, (user) => user.tasks)
  user: UserEntity
}
