import { IsArray, IsOptional, Length } from 'class-validator'
import { ApiPropertyOptional } from '@nestjs/swagger'

export class UpdateTaskDto {
  @ApiPropertyOptional({
    description: 'task new title',
    default: 'updated task',
  })
  @IsOptional()
  @Length(3, 50)
  title: string

  @ApiPropertyOptional({
    description: 'task new description',
    default: 'updated description',
  })
  @IsOptional()
  description: string

  @ApiPropertyOptional({
    description: 'task new category',
    default: 'category1',
  })
  @IsOptional()
  category: string

  @ApiPropertyOptional({
    description: 'updated value for done field',
    default: true,
  })
  @IsOptional()
  done: boolean

  @ApiPropertyOptional({
    description: 'new labels',
    type: [String],
  })
  @IsOptional()
  @IsArray()
  labels: string[]
}
