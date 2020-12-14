import {
  Body,
  Controller,
  Get,
  Header,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common'
import { ApiQuery, ApiResponse } from '@nestjs/swagger'
import { UserService } from './user.service'
import { CreateUserDto } from './dto'
import { UserEntity } from './entities'
import { BookEntity } from '../books/entities'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiResponse({ status: 200, description: 'Registers a new user' })
  @Header('Content-Type', 'application/json')
  @Post()
  postUser(@Body() user: CreateUserDto): Promise<UserEntity> {
    return this.userService.insert(user)
  }

  @ApiResponse({ status: 200, description: 'Returns all users' })
  @Get()
  getAll(): Promise<UserEntity[]> {
    return this.userService.getAllUsers()
  }

  @ApiResponse({
    status: 200,
    description: 'Returns all books owned by the user determined by userId',
  })
  @ApiQuery({
    name: 'userId',
    required: true,
    type: Number,
    description: `Id of books' owner`,
  })
  @Get('books')
  getBooks(
    @Query('userId', ParseIntPipe) userId: number,
  ): Promise<BookEntity[]> {
    return this.userService.getBooksOfUser(userId)
  }
}
