import { Length, IsOptional, Min, IsNumber } from 'class-validator'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

export class PersonDto {
  @ApiProperty({
    description: 'Enter Your Name > ',
    minLength: 3,
    default: 'Mohammad',
    maxLength: 10,
  })
  @Length(3, 10)
  name: string

  @ApiPropertyOptional({
    description: 'Optional',
    default: 1998,
    minimum: 1960,
  })
  @IsNumber()
  @IsOptional()
  @Min(1960)
  year: number
}
