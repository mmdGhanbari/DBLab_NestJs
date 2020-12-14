import { ApiProperty } from '@nestjs/swagger'

export default class CreateUserDto {
  @ApiProperty({
    description: 'User name',
    default: 'Mohammad Ghanbari',
    minLength: 3,
    maxLength: 15,
  })
  readonly name: string
}
