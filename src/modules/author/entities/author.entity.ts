import { Book } from '../../../modules/book/entities/book.entity';
import { CommonEntity } from '../../../common/entity/common.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity({ name: 'author' })
export class Author extends CommonEntity {
  @Column({ length: 256, name: 'first_name' })
  first_name: string;

  @Column({ length: 256, name: 'last_name' })
  last_name: string;

  @OneToMany(() => Book, (book) => book.author)
  books: Book[];
}
