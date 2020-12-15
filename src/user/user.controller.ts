import {
  Body,
  Controller,
  Get,
  Header,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common'
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger'
import { UserService } from './user.service'
import { CreateUserDto } from './dto'
import { UserEntity } from './entities'
import { BookEntity } from '../books/entities'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOkResponse({ description: 'Registers a new user' })
  @Header('Content-Type', 'application/json')
  @Post()
  postUser(@Body() user: CreateUserDto): Promise<UserEntity> {
    return this.userService.insert(user)
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ description: 'Returns all users' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized user' })
  @Get()
  getAll(): Promise<UserEntity[]> {
    return this.userService.getAllUsers()
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({
    description: 'Returns all books owned by the user determined by userId',
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized user' })
  @Get('books')
  getBooks(@Request() { user }: { user: UserEntity }): Promise<BookEntity[]> {
    return this.userService.getBooksOfUser(user.id)
  }
}
