import { Body, Controller, Get, Header, Post } from '@nestjs/common'
import { ApiResponse } from '@nestjs/swagger'
import { BooksService } from './books.service'
import { BookEntity } from './entities'
import { CreateBookDto } from './dto'

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
}
