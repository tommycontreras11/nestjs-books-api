import { Column, Entity } from 'typeorm';
import { CommonEntity } from '../../../common/entity/common.entity';

@Entity({ name: 'genre' })
export class Genre extends CommonEntity {
  @Column({ length: 256 })
  name: string;
}
