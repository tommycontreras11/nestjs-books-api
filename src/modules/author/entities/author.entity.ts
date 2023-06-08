import { CommonEntity } from '../../../common/entity/common.entity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'author' })
export class Author extends CommonEntity {
  @Column({ type: 'string', length: 256 })
  first_name: string;

  @Column({ type: 'string', length: 256 })
  last_name: string;
}
