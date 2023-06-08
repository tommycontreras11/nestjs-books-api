import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const swaggerDocument = new DocumentBuilder()
    .setTitle('Api Books')
    .setDescription('This api is about the manage of books')
    .setVersion('1.0')
    .build();
  
  const document = SwaggerModule.createDocument(app, swaggerDocument);
  SwaggerModule.setup('api', app, document);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
