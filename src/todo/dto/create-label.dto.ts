import { Length } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateLabelDto {
  @ApiProperty({
    description: 'label name',
    default: 'label1',
  })
  @Length(3, 30)
  name: string
}
