import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { CommonEntity } from '../../../common/entity/common.entity';
import { Author } from '../../../modules/author/entities/author.entity';
import { Genre } from '../../../modules/genre/entities/genre.entity';

@Entity({ name: 'book' })
export class Book extends CommonEntity {
  @Column({ length: 256, unique: true })
  title: string;

  @ManyToOne(() => Author, (author) => author.books)
  @JoinColumn({ name: 'author_id' })
  author: Author;

  @ManyToOne(() => Genre, (genre) => genre.books)
  genre: Genre;
}
