import { BookEntity } from './entities'
import { UserEntity } from '../user/entities'
import { GenreEntity } from '../genre/entities'
import { CreateBookDto } from './dto'

export class BooksService {
  async insert(bookDetails: CreateBookDto): Promise<BookEntity> {
    const { name, userId, genreIds } = bookDetails
    const book = new BookEntity()
    book.name = name
    book.user = await UserEntity.findOne(userId)
    book.genres = []
    for (let i = 0; i < genreIds.length; i++) {
      const genre = await GenreEntity.findOne(genreIds[i])
      book.genres.push(genre)
    }
    await book.save()
    return book
  }

  async getAllBooks(): Promise<BookEntity[]> {
    return BookEntity.find()
  }
}
