import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { GenreService } from './genre.service'
import { GenreController } from './genre.controller'
import { GenreEntity } from './entities'

@Module({
  imports: [TypeOrmModule.forFeature([GenreEntity])],
  controllers: [GenreController],
  providers: [GenreService],
})
export class GenreModule {}
