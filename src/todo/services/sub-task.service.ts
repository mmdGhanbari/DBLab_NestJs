import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { SubTaskEntity } from '../entities'
import { Repository } from 'typeorm'
import { UpdateSubTaskDto } from '../dto'

@Injectable()
export class SubTaskService {
  constructor(
    @InjectRepository(SubTaskEntity)
    private readonly subTasksRepo: Repository<SubTaskEntity>,
  ) {}

  async save(title: string): Promise<SubTaskEntity> {
    return this.subTasksRepo.save({ title, done: false })
  }

  async saveBulk(tasks: string[]): Promise<SubTaskEntity[]> {
    const subTasks = tasks.map((task) => ({
      title: task,
      done: false,
    }))
    return this.subTasksRepo.save(subTasks)
  }

  async update(
    id: number,
    { title, done }: UpdateSubTaskDto,
  ): Promise<SubTaskEntity> {
    const subTask = await this.subTasksRepo.findOne(id)
    if (title != null) subTask.title = title
    if (done != null) subTask.done = done
    return this.subTasksRepo.save(subTask)
  }

  async delete(id: number): Promise<number> {
    await this.subTasksRepo.delete(id)
    return id
  }
}
