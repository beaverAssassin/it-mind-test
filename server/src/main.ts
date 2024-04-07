import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: false });
  await app.listen(3003);
  app.enableCors({origin: "http://localhost:3001/"});

  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
