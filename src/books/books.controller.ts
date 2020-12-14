import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  Param,
  Post,
  Put,
} from '@nestjs/common'
import { ApiResponse } from '@nestjs/swagger'
import { BooksService } from './books.service'
import { BookEntity } from './entities'
import { CreateBookDto, UpdateBookDto } from './dto'

@Controller('book')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @ApiResponse({ status: 200, description: 'Registers a new book' })
  @Header('Content-Type', 'application/json')
  @Post()
  insertBook(@Body() book: CreateBookDto): Promise<BookEntity> {
    return this.booksService.insert(book)
  }

  @ApiResponse({ status: 200, description: 'Returns all books' })
  @Get()
  getAllBooks(): Promise<BookEntity[]> {
    return this.booksService.getAllBooks()
  }

  @ApiResponse({
    status: 200,
    description: 'Deletes specified book and returns the id',
  })
  @Delete(':id')
  deleteBook(@Param('id') bookId: number): Promise<number> {
    return this.booksService.deleteBook(bookId)
  }

  @ApiResponse({
    status: 200,
    description: 'Updates specified book',
  })
  @Put(':id')
  updateBook(
    @Param('id') bookId: number,
    @Body() { newName }: UpdateBookDto,
  ): Promise<BookEntity> {
    return this.booksService.updateBook(bookId, newName)
  }
}
