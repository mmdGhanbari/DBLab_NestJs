import { Repository } from 'typeorm'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { TaskEntity } from '../entities'
import { CreateTaskDto, UpdateTaskDto } from '../dto'
import { CategoryService } from './category.service'
import { LabelService } from './label.service'
import { SubTaskService } from './sub-task.service'
import { UserService } from '../../user/user.service'

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(TaskEntity)
    private readonly tasksRepo: Repository<TaskEntity>,
    private readonly categoryService: CategoryService,
    private readonly labelService: LabelService,
    private readonly subTaskService: SubTaskService,
    private readonly userService: UserService,
  ) {}

  async save(
    { title, description, category, labels, subTasks }: CreateTaskDto,
    username: string,
  ): Promise<TaskEntity> {
    const categoryEntity = await this.categoryService.save({ name: category })
    const labelEntities = await this.labelService.saveBulk(labels)
    const subTaskEntities = await this.subTaskService.saveBulk(subTasks)
    const userEntity = await this.userService.findOne(username)

    return this.tasksRepo.save({
      title,
      description,
      category: categoryEntity,
      subTasks: subTaskEntities,
      labels: labelEntities,
      user: userEntity,
    })
  }

  async update(
    id: number,
    { title, description, category, done, labels }: UpdateTaskDto,
  ): Promise<TaskEntity> {
    const task = await this.tasksRepo.findOne(id)
    if (title != null) task.title = title
    if (description != null) task.description = description
    if (done != null) task.done = done
    if (category != null)
      task.category = await this.categoryService.save({ name: category })
    if (labels != null) task.labels = await this.labelService.saveBulk(labels)

    return this.tasksRepo.save(task)
  }

  async delete(id: number): Promise<number> {
    await this.tasksRepo.delete(id)
    return id
  }

  async addSubTask(taskId: number, subTaskTitle: string): Promise<TaskEntity> {
    const task = await this.tasksRepo.findOne({
      where: { id: taskId },
      relations: ['subTasks'],
    })
    const newSubTask = await this.subTaskService.save(subTaskTitle)
    task.subTasks = [...task.subTasks, newSubTask]
    return this.tasksRepo.save(task)
  }
}
