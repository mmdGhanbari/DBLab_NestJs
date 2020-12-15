import { IsArray, IsOptional, Length } from 'class-validator'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

export class CreateTaskDto {
  @ApiProperty({
    description: 'task title',
    default: 'task1',
  })
  @Length(3, 50)
  title: string

  @ApiPropertyOptional({
    description: 'task description',
  })
  @IsOptional()
  description: string

  @ApiProperty({
    description: "task's category name",
    default: 'category1',
  })
  category: string

  @ApiPropertyOptional({
    description: 'task sub-tasks',
    type: [String],
  })
  @IsOptional()
  @IsArray()
  subTasks: string[]

  @ApiPropertyOptional({
    description: 'task labels',
    type: [String],
  })
  @IsOptional()
  @IsArray()
  labels: string[]
}
