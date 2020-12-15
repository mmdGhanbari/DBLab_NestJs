import { Injectable } from '@nestjs/common'
import { UserEntity } from './entities'
import { CreateUserDto } from './dto'
import { TaskEntity } from '../todo/entities'

@Injectable()
export class UserService {
  async insert({ name, password }: CreateUserDto): Promise<UserEntity> {
    const userEntity: UserEntity = UserEntity.create()
    userEntity.name = name
    userEntity.password = password

    await UserEntity.save(userEntity)
    return userEntity
  }

  async findOne(username: string): Promise<UserEntity | undefined> {
    return UserEntity.findOne({ name: username })
  }

  async getAllUsers(): Promise<UserEntity[]> {
    return UserEntity.find({ select: ['id', 'name'] })
  }

  async getUserTasks(userId: number): Promise<TaskEntity[]> {
    const user: UserEntity = await UserEntity.findOne({
      where: { id: userId },
      relations: ['tasks', 'tasks.category', 'tasks.subTasks', 'tasks.labels'],
    })
    return user.tasks
  }
}
