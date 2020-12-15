import { Length } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateSubTaskDto {
  @ApiProperty({
    description: 'sub-task title',
    default: 'task1',
  })
  @Length(3, 50)
  title: string
}
