import { Injectable } from '@nestjs/common'
import { UserEntity } from './entities'
import { CreateUserDto } from './dto'
import { BookEntity } from '../books/entities'

@Injectable()
export class UserService {
  async insert({ name }: CreateUserDto): Promise<UserEntity> {
    const userEntity: UserEntity = UserEntity.create()
    userEntity.name = name

    await UserEntity.save(userEntity)
    return userEntity
  }

  async getAllUsers(): Promise<UserEntity[]> {
    return await UserEntity.find()
  }

  async getBooksOfUser(userId: number): Promise<BookEntity[]> {
    const user: UserEntity = await UserEntity.findOne({
      where: { id: userId },
      relations: ['books'],
    })
    return user.books
  }
}
