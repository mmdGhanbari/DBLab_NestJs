import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
} from 'typeorm'
import { BookEntity } from '../../books/entities'

@Entity()
export default class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ length: 500 })
  name: string

  @OneToMany(() => BookEntity, (book) => book.user)
  books: BookEntity[]
}
