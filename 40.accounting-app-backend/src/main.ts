import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication, ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';

function loadSwagger(app: INestApplication, route: string) {
  const config = new DocumentBuilder()
    .setTitle('Accounting App')
    .setVersion('1.0')
    .addTag('customers')
    .addTag('transactions')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(route, app, documentFactory);
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  loadSwagger(app, 'swagger');
  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
