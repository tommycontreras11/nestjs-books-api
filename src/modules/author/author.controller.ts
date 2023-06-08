import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AuthorService } from './author.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { CreateAuthorResponseDto } from './dto/create-author-response.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('api/v1/author')
@ApiTags('Author')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @Post()
  async create(@Body() createAuthorDto: CreateAuthorDto) {
    const createAuthorResponseDto = new CreateAuthorResponseDto();
    try {
      const newAuthor = await this.authorService.create(createAuthorDto);

      createAuthorResponseDto.success = true;
      createAuthorResponseDto.message = 'The author was succesfully created';
      createAuthorResponseDto.author = newAuthor;
    } catch (error) {
      createAuthorResponseDto.success = false;
      createAuthorResponseDto.message = error;
    }

    return createAuthorResponseDto;
  }

  @Get()
  findAll() {
    return this.authorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authorService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateAuthorDto: UpdateAuthorDto,
  ) {
    const createAuthorResponseDto = new CreateAuthorResponseDto();
    try {
      const newAuthor = await this.authorService.update(+id, updateAuthorDto);

      createAuthorResponseDto.success = true;
      createAuthorResponseDto.message = 'The author was succesfully updated';
      createAuthorResponseDto.author = newAuthor;
    } catch (error) {
      createAuthorResponseDto.success = false;
      createAuthorResponseDto.message = error;
    }

    return createAuthorResponseDto;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authorService.remove(+id);
  }
}
