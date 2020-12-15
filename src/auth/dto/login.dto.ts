import { ApiProperty } from '@nestjs/swagger'

export default class LoginDto {
  @ApiProperty({
    description: 'username',
    default: 'mmdGhanbari',
  })
  readonly username: string

  @ApiProperty({
    description: 'password',
    default: '123',
  })
  readonly password: string
}
