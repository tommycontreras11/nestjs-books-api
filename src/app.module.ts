import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthorModule } from './modules/author/author.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Author } from './modules/author/entities/author.entity';

@Module({
  imports: [AuthorModule, TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    username: 'root',
    password: '',
    database: 'nestjs_book_api',
    entities: [Author],
    synchronize: true
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
