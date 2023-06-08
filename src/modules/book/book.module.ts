import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { Author } from '../author/entities/author.entity';
import { Genre } from '../genre/entities/genre.entity';
import { GenreService } from '../genre/genre.service';
import { AuthorService } from '../author/author.service';

@Module({
  imports: [TypeOrmModule.forFeature([Book, Author, Genre])],
  controllers: [BookController],
  providers: [BookService, AuthorService, GenreService]
})
export class BookModule {}
