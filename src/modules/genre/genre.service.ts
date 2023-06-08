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
    const newGenre = this.genreRepository.create(createGenreDto);
    return await this.genreRepository.save(newGenre);
  }

  async findAll() {
    return await this.genreRepository.find({});
  }

  async findOne(id: number) {
    const foundGenre = await this.genreRepository.findOneBy({ id });
    if (!foundGenre) {
      throw new NotFoundException(
        `Sorry, we could not find the ${this.genreRepository.metadata.tableName} with the ID ${id}. Please, try again with a valid ID`,
      );
    }
    return foundGenre;
  }

  async update(id: number, updateGenreDto: UpdateGenreDto) {
    const foundGenre = await this.findOne(id);
    const genre = { ...foundGenre, ...updateGenreDto };
    return await this.genreRepository.save(genre);
  }

  async remove(id: number) {
    const foundGenre = await this.findOne(id);
    return await this.genreRepository.softRemove(foundGenre);
  }
}
