import { ApiProperty } from '@nestjs/swagger'

export default class CreateBookDto {
  @ApiProperty({
    description: 'Book name',
    default: 'The Last of Us',
    minLength: 3,
    maxLength: 30,
  })
  readonly name: string

  @ApiProperty({
    description: 'Owner Id',
    default: 1,
  })
  readonly userId: number

  @ApiProperty({
    description: 'List of GenreIds',
    type: [Number],
  })
  readonly genreIds: number[]
}
