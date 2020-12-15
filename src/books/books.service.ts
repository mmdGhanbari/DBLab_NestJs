import { InjectRepository } from '@nestjs/typeorm'
import { BookEntity } from './entities'
import { UserEntity } from '../user/entities'
import { GenreEntity } from '../genre/entities'
import { CreateBookDto } from './dto'
import { Repository } from 'typeorm'

export class BooksService {
  constructor(
    @InjectRepository(BookEntity)
    private readonly booksRepo: Repository<BookEntity>,
  ) {}

  async insert(
    bookDetails: CreateBookDto,
    userId: number,
  ): Promise<BookEntity> {
    const { name, genreIds } = bookDetails
    const user = await UserEntity.findOne(userId)
    const genres = await Promise.all(
      genreIds.map((id) => GenreEntity.findOne(id)),
    )
    return this.booksRepo.save({
      name,
      user,
      genres,
    })
  }

  async getAllBooks(): Promise<BookEntity[]> {
    return BookEntity.find()
  }

  async deleteBook(bookId: number): Promise<number> {
    await BookEntity.delete(bookId)
    return bookId
  }

  async updateBook(bookId: number, newName: string): Promise<BookEntity> {
    await this.booksRepo.update(bookId, { name: newName })
    return this.booksRepo.findOne(bookId)
  }
}
