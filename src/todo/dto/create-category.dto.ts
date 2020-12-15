import { Length } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateCategoryDto {
  @ApiProperty({
    description: 'category name',
    default: 'category1',
  })
  @Length(3, 30)
  name: string
}
