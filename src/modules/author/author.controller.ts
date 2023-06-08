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
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('api/v1/author')
@ApiTags('Author')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @ApiOperation({ summary: 'Create an Author' })
  @Post()
  async create(@Body() createAuthorDto: CreateAuthorDto) {
    return await this.authorService.create(createAuthorDto);
  }

  @ApiOperation({ summary: 'Retrieve many Authors' })
  @Get()
  findAll() {
    return this.authorService.findAll();
  }

  @ApiOperation({ summary: 'Retrieve one Author' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authorService.findOne(+id);
  }

  @ApiOperation({ summary: 'Replace one Author' })
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateAuthorDto: UpdateAuthorDto,
  ) {
    return await this.authorService.update(+id, updateAuthorDto);
  }

  @ApiOperation({ summary: 'Delete one Author' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authorService.remove(+id);
  }
}
