import {
  Controller,
  Get,
  Post,
  Body,
  Request,
  UseGuards,
  Delete,
  Param,
  Put,
} from '@nestjs/common'
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger'
import { TaskService } from '../services'
import { CreateSubTaskDto, CreateTaskDto, UpdateTaskDto } from '../dto'
import UserEntity from '../../user/entities/user.entity'
import TaskEntity from '../entities/task.entity'
import { UserService } from '../../user/user.service'
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard'

@Controller('task')
export class TaskController {
  constructor(
    private readonly taskService: TaskService,
    private readonly userService: UserService,
  ) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiUnauthorizedResponse({ description: 'Unauthorized user' })
  @ApiOkResponse({ description: 'Creates a new task for user' })
  create(
    @Body() task: CreateTaskDto,
    @Request() { user }: { user: UserEntity },
  ): Promise<TaskEntity> {
    return this.taskService.save(task, user.name)
  }

  @Post(':id/sub-task')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiUnauthorizedResponse({ description: 'Unauthorized user' })
  @ApiOkResponse({ description: 'Adds a new sub-task to specified task' })
  addSubTask(
    @Param('id') id: number,
    @Body() { title }: CreateSubTaskDto,
    @Request() { user }: { user: UserEntity },
  ): Promise<TaskEntity> {
    return this.taskService.addSubTask(id, title)
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiUnauthorizedResponse({ description: 'Unauthorized user' })
  @ApiOkResponse({ description: 'Returns all tasks for loggedIn user' })
  findUserTasks(
    @Request() { user }: { user: UserEntity },
  ): Promise<TaskEntity[]> {
    return this.userService.getUserTasks(user.id)
  }

  @Put(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiUnauthorizedResponse({ description: 'Unauthorized user' })
  @ApiOkResponse({ description: 'Updates task' })
  updateTask(
    @Param('id') id: number,
    @Body() task: UpdateTaskDto,
  ): Promise<TaskEntity> {
    return this.taskService.update(id, task)
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiUnauthorizedResponse({ description: 'Unauthorized user' })
  @ApiOkResponse({ description: 'Deletes task' })
  deleteTask(@Param('id') id: number): Promise<number> {
    return this.taskService.delete(id)
  }
}
