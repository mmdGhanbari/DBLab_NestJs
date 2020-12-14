import { PartialType } from '@nestjs/mapped-types'
import CreateGenreDto from './create-genre.dto'

export default class UpdateGenreDto extends PartialType(CreateGenreDto) {}
