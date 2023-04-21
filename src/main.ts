import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  // const app = await NestFactory.create(AppModule);
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setGlobalPrefix('api/v1'); // Set global prefix for API
  app.enableCors();
  app.useStaticAssets(join(__dirname, '/public/images/')); // Set static path for E-mail template
  await app.listen(process.env.PORT);

  console.log(`server run on ${process.env.PORT}`);
}
bootstrap();
