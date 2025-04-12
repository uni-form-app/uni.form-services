import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // Enables class-transformer
      whitelist: true, // Strips properties not defined in the DTO
      stopAtFirstError: true,
    }),
  );
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('Uni.form API')
    .setDescription('Documentação da API uni.form')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
