import { Injectable } from '@nestjs/common'
import { CreateGenreDto } from './dto'
import { GenreEntity } from './entities'

@Injectable()
export class GenreService {
  async insert(genreDetails: CreateGenreDto): Promise<GenreEntity> {
    const genreEntity: GenreEntity = GenreEntity.create()
    const { type } = genreDetails

    genreEntity.type = type
    await GenreEntity.save(genreEntity)
    return genreEntity
  }

  async getAllGenre(): Promise<GenreEntity[]> {
    return await GenreEntity.find()
  }
}
