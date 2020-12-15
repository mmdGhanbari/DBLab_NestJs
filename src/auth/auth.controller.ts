import { Controller, Request, Post, UseGuards } from '@nestjs/common'
import {
  ApiBody,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger'
import { LocalAuthGuard } from './guards/local-auth.guard'
import { AuthService } from './auth.service'
import LoginDto from './dto/login.dto'

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @ApiOkResponse({
    description: 'User logged in and JWT token generated',
  })
  @ApiUnauthorizedResponse({ description: 'Unknown user' })
  @ApiBody({
    type: LoginDto,
  })
  @Post('auth/login')
  async login(@Request() req): Promise<any> {
    return this.authService.login(req.user)
  }
}
