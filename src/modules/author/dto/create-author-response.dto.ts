import { Author } from '../entities/author.entity';

export class CreateAuthorResponseDto {
  success: boolean;
  message: string;
  author: Author;
}
