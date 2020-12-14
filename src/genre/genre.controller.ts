import { Body, Controller, Get, Header, Post } from '@nestjs/common'
import { ApiResponse } from '@nestjs/swagger'
import { GenreService } from './genre.service'
import { CreateGenreDto } from './dto'
import { GenreEntity } from './entities'

@Controller('genre')
export class GenreController {
  constructor(private readonly genreService: GenreService) {}

  @ApiResponse({ status: 200, description: 'Saves new genre' })
  @Header('Content-Type', 'application/json')
  @Post()
  insertGenre(@Body() genre: CreateGenreDto): Promise<GenreEntity> {
    return this.genreService.insert(genre)
  }

  @ApiResponse({ status: 200, description: 'Returns all genres' })
  @Get()
  getAll(): Promise<GenreEntity[]> {
    return this.genreService.getAllGenre()
  }
}
