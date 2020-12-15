import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import {
  CategoryController,
  LabelController,
  SubTaskController,
  TaskController,
} from './controllers'
import {
  CategoryService,
  LabelService,
  SubTaskService,
  TaskService,
} from './services'
import { UserModule } from '../user/user.module'
import {
  CategoryEntity,
  LabelEntity,
  SubTaskEntity,
  TaskEntity,
} from './entities'

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forFeature([
      CategoryEntity,
      LabelEntity,
      TaskEntity,
      SubTaskEntity,
    ]),
  ],
  controllers: [
    TaskController,
    SubTaskController,
    CategoryController,
    LabelController,
  ],
  providers: [TaskService, SubTaskService, CategoryService, LabelService],
})
export class TodoModule {}
