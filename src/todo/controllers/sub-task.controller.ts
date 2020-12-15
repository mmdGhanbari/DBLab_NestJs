import { Body, Controller, Delete, Param, Put, UseGuards } from '@nestjs/common'
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger'
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard'
import { SubTaskService } from '../services'
import { SubTaskEntity } from '../entities'
import { UpdateSubTaskDto } from '../dto'

@Controller('sub-task')
export class SubTaskController {
  constructor(private readonly subTaskService: SubTaskService) {}

  @Put(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiUnauthorizedResponse({ description: 'Unauthorized user' })
  @ApiOkResponse({ description: 'Updates specified sub-task' })
  async updateSubTask(
    @Param('id') id: number,
    @Body() task: UpdateSubTaskDto,
  ): Promise<SubTaskEntity> {
    return this.subTaskService.update(id, task)
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiUnauthorizedResponse({ description: 'Unauthorized user' })
  @ApiOkResponse({ description: 'Deletes specified sub-task' })
  async deleteSubTask(@Param('id') id: number): Promise<number> {
    return this.subTaskService.delete(id)
  }
}
