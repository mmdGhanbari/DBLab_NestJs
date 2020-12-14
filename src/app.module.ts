import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { HelloModule } from './hello/hello.module'
import { BooksModule } from './books/books.module'
import { UserModule } from './user/user.module'
import { GenreModule } from './genre/genre.module'

@Module({
  imports: [
    HelloModule,
    BooksModule,
    UserModule,
    GenreModule,
    TypeOrmModule.forRoot(),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
