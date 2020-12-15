import { ApiProperty } from '@nestjs/swagger'

export default class CreateUserDto {
  @ApiProperty({
    description: 'User name',
    default: 'mmdGhanbari',
    minLength: 3,
    maxLength: 15,
  })
  readonly name: string

  @ApiProperty({
    description: 'User password',
    default: '123',
    minLength: 3,
    maxLength: 30,
  })
  readonly password: string
}
