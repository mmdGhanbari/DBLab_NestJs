import { Body, Controller, Get, Header, Post, UseGuards } from '@nestjs/common'
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger'
import { GenreService } from './genre.service'
import { CreateGenreDto } from './dto'
import { GenreEntity } from './entities'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'

@Controller('genre')
export class GenreController {
  constructor(private readonly genreService: GenreService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ description: 'Saves new genre' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized user' })
  @Header('Content-Type', 'application/json')
  @Post()
  insertGenre(@Body() genre: CreateGenreDto): Promise<GenreEntity> {
    return this.genreService.insert(genre)
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ description: 'Returns all genres' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized user' })
  @Get()
  getAll(): Promise<GenreEntity[]> {
    return this.genreService.getAllGenre()
  }
}
