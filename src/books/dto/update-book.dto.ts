import { ApiProperty } from '@nestjs/swagger'

export default class UpdateBookDto {
  @ApiProperty({
    description: 'New name',
    default: 'The Last of Us 2',
    minLength: 3,
    maxLength: 30,
  })
  newName: string
}
