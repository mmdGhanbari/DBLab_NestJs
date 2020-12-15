import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common'
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger'
import { LabelService } from '../services'
import { CreateLabelDto } from '../dto'
import { LabelEntity } from '../entities'
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard'

@Controller('label')
export class LabelController {
  constructor(private readonly labelService: LabelService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiUnauthorizedResponse({ description: 'Unauthorized user' })
  @ApiOkResponse({ description: 'Creates a new label' })
  async create(@Body() label: CreateLabelDto): Promise<LabelEntity> {
    return this.labelService.save(label)
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiUnauthorizedResponse({ description: 'Unauthorized user' })
  @ApiOkResponse({ description: 'Returns all labels' })
  async getAll(): Promise<LabelEntity[]> {
    return this.labelService.findAll()
  }

  @Delete(':name')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiUnauthorizedResponse({ description: 'Unauthorized user' })
  @ApiOkResponse({
    description: 'Deletes specified label',
  })
  async delete(@Param('name') name: string): Promise<string> {
    return this.labelService.delete(name)
  }
}
