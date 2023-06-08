import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const swaggerDocument = new DocumentBuilder()
    .setTitle('Api Books')
    .setDescription('This api is about the manage of books')
    .setVersion('1.0')
    .build();
  
  const document = SwaggerModule.createDocument(app, swaggerDocument);
  SwaggerModule.setup('app', app, document);
  await app.listen(3000);
}
bootstrap();
