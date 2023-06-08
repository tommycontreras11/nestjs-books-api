import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { Genre } from './entities/genre.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class GenreService {
  constructor(
    @InjectRepository(Genre)
    private readonly genreRepository: Repository<Genre>,
  ) {}

  async create(createGenreDto: CreateGenreDto) {
    const foundName = await this.findByName(createGenreDto.name);
    if (foundName) {
      throw new NotFoundException(
        `Sorry, we found a record with the name ${createGenreDto.name}. Please, try again with a valid name`,
      );
    }
    const newGenre = this.genreRepository.create(createGenreDto);
    return await this.genreRepository.save(newGenre);
  }

  async findAll() {
    return await this.genreRepository.find({});
  }

  async findOne(id: number) {
    const foundGenre = await this.genreRepository.findOne({
      where: { id },
      relations: { books: true },
      select: {
        id: true,
        name: true,
        created_at: true,
        updated_at: true,
        deleted_at: true,
        books: {
          id: true,
          title: true,
          created_at: true,
          updated_at: true,
          deleted_at: true,
        }
      }
    });
    if (!foundGenre) {
      throw new NotFoundException(
        `Sorry, we could not find the ${this.genreRepository.metadata.tableName} with the ID ${id}. Please, try again with a valid ID`,
      );
    }
    return foundGenre;
  }

  async findByName(name: string) {
    return await this.genreRepository.findOneBy({ name });
  }

  async update(id: number, updateGenreDto: UpdateGenreDto) {
    const foundGenre = await this.findOne(id);
    const genre = { ...foundGenre, ...updateGenreDto };
    return await this.genreRepository.save(genre);
  }

  async remove(id: number) {
    const foundGenre = await this.findOne(id);
    const genre = { ...foundGenre, active: false };
    await this.update(id, genre);
    return await this.genreRepository.softRemove(foundGenre);
  }
}
