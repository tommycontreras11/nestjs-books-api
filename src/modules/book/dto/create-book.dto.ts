import { ApiProperty } from '@nestjs/swagger';
import { Author } from '../../../modules/author/entities/author.entity';
import { Genre } from '../../../modules/genre/entities/genre.entity';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateBookDto {
  @ApiProperty({ example: 'Batman' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  author: Author;

  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  genre: Genre;
}
