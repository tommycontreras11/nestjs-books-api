import { Column, Entity, OneToMany } from 'typeorm';
import { CommonEntity } from '../../../common/entity/common.entity';
import { Book } from '../../../modules/book/entities/book.entity';

@Entity({ name: 'genre' })
export class Genre extends CommonEntity {
  @Column({ length: 256, unique: true })
  name: string;

  @OneToMany(() => Book, (book) => book.genre)
  books: Book[];
}
