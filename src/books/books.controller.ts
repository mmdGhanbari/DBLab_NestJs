import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common'
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger'
import { BooksService } from './books.service'
import { BookEntity } from './entities'
import { CreateBookDto, UpdateBookDto } from './dto'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'
import UserEntity from '../user/entities/user.entity'

@Controller('book')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ description: 'Registers a new book' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized user' })
  @Header('Content-Type', 'application/json')
  @Post()
  insertBook(
    @Body() book: CreateBookDto,
    @Request() { user }: { user: UserEntity },
  ): Promise<BookEntity> {
    return this.booksService.insert(book, user.id)
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ description: 'Returns all books' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized user' })
  @Get()
  getAllBooks(): Promise<BookEntity[]> {
    return this.booksService.getAllBooks()
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({
    description: 'Deletes specified book and returns the id',
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized user' })
  @Delete(':id')
  deleteBook(@Param('id') bookId: number): Promise<number> {
    return this.booksService.deleteBook(bookId)
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({
    description: 'Updates specified book',
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized user' })
  @Put(':id')
  updateBook(
    @Param('id') bookId: number,
    @Body() { newName }: UpdateBookDto,
  ): Promise<BookEntity> {
    return this.booksService.updateBook(bookId, newName)
  }
}
