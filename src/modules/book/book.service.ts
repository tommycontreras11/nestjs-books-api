import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthorService } from '../author/author.service';
import { GenreService } from '../genre/genre.service';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book) private readonly bookRepository: Repository<Book>,
    private readonly authorService: AuthorService,
    private readonly genreService: GenreService,
  ) {}

  async create(createBookDto: CreateBookDto) {
    const foundTitle = await this.findByTitle(createBookDto.title);
    if (foundTitle) {
      throw new BadRequestException(
        `Sorry, we found a record with the title ${createBookDto.title}. Please, try again with a valid title`,
      );
    }

    const foundAuthor = await this.authorService.findOne(+createBookDto.author);
    if (!foundAuthor) {
      throw new NotFoundException(
        `Sorry, we could not find the author with the ID ${createBookDto.author}. Please, try again with a valid ID`,
      );
    }

    const foundGenre = await this.genreService.findOne(+createBookDto.genre);
    if (!foundGenre) {
      throw new NotFoundException(
        `Sorry, we could not find the genre with the ID ${createBookDto.genre}. Please, try again with a valid ID`,
      );
    }

    const newBook = this.bookRepository.create(createBookDto);
    return await this.bookRepository.save(newBook);
  }

  async findAll() {
    return await this.bookRepository.find({});
  }

  async findOne(id: number) {
    const foundBook = await this.bookRepository.findOne({
      where: { id },
      relations: { author: true, genre: true },
      select: {
        id: true,
        title: true,
        created_at: true,
        updated_at: true,
        deleted_at: true,
        genre: {
          id: true,
          name: true,
          created_at: true,
          updated_at: true,
          deleted_at: true,
        },
        author: {
          id: true,
          first_name: true,
          last_name: true,
          created_at: true,
          updated_at: true,
          deleted_at: true,
        }
      },
    });
    if (!foundBook) {
      throw new NotFoundException(
        `Sorry, we could not find the ${this.bookRepository.metadata.tableName} with the ID ${id}. Please, try again with a valid ID`,
      );
    }
    return foundBook;
  }

  async findByTitle(title: string) {
    return await this.bookRepository.findOneBy({ title });
  }

  async update(id: number, updateBookDto: UpdateBookDto) {
    const foundBook = await this.findOne(id);
    const book = { ...foundBook, ...updateBookDto };
    return await this.bookRepository.save(book);
  }

  async remove(id: number) {
    const foundBook = await this.findOne(id);
    const book = { ...foundBook, active: false };
    await this.update(id, book);
    return await this.bookRepository.softRemove(foundBook);
  }
}
