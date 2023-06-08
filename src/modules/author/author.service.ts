import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Author } from './entities/author.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthorService {
  constructor(
    @InjectRepository(Author)
    private readonly authorRepository: Repository<Author>,
  ) {}

  async create(createAuthorDto: CreateAuthorDto) {
    try {
      const newAuthor = this.authorRepository.create(createAuthorDto);
      await this.authorRepository.save(newAuthor);

      return newAuthor;
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    return await this.authorRepository.find({});
  }

  async findOne(id: number) {
    const findAuthor = await this.authorRepository.findOneBy({ id });
    if (!findAuthor) {
      throw new NotFoundException(
        `Sorry, we could not find the ${this.authorRepository.metadata.tableName} with the ID ${id}. Please, try again with a valid ID`,
      );
    }
    return findAuthor;
  }

  async update(id: number, updateAuthorDto: UpdateAuthorDto) {
    const findAuthor = await this.findOne(id);
    const author = { ...findAuthor, ...updateAuthorDto };
    return await this.authorRepository.save(author);
  }

  async remove(id: number) {
    const findAuthor = await this.findOne(id);
    return await this.authorRepository.softRemove(findAuthor);
  }
}
