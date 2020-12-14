import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm'
import { UserEntity } from '../../user/entities'
import { GenreEntity } from '../../genre/entities'

@Entity()
export default class BookEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ length: 500 })
  name: string

  @ManyToOne(() => UserEntity, (user) => user.books)
  user: UserEntity

  @ManyToMany(() => GenreEntity)
  @JoinTable()
  genres: GenreEntity[]
}
