import { IsOptional, Length } from 'class-validator'
import { ApiPropertyOptional } from '@nestjs/swagger'

export class UpdateSubTaskDto {
  @ApiPropertyOptional({
    description: 'sub-task new title',
    default: 'task1',
  })
  @IsOptional()
  @Length(3, 50)
  title: string

  @ApiPropertyOptional({
    description: 'updated value for done field',
  })
  @IsOptional()
  done: boolean
}
