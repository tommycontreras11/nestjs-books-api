import { CommonEntity } from '../../../common/entity/common.entity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'author' })
export class Author extends CommonEntity {
  @Column({ length: 256, name: 'first_name' })
  first_name: string;

  @Column({ length: 256, name: 'last_name' })
  last_name: string;
}
