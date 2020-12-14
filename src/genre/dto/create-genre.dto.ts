import { ApiProperty } from '@nestjs/swagger'

export default class CreateGenreDto {
  @ApiProperty({
    description: 'Genre type',
    default: 'FairyTale',
    minLength: 3,
    maxLength: 10,
  })
  readonly type: string
}
