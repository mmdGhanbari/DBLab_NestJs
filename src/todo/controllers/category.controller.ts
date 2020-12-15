import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common'
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger'
import { CategoryService } from '../services'
import { CreateCategoryDto } from '../dto'
import { CategoryEntity } from '../entities'
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard'

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiUnauthorizedResponse({ description: 'Unauthorized user' })
  @ApiOkResponse({ description: 'Creates a new category' })
  async create(@Body() category: CreateCategoryDto): Promise<CategoryEntity> {
    return this.categoryService.save(category)
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiUnauthorizedResponse({ description: 'Unauthorized user' })
  @ApiOkResponse({ description: 'Returns all categories' })
  async getAll(): Promise<CategoryEntity[]> {
    return this.categoryService.findAll()
  }
}
