import { NestFactory } from '@nestjs/core';
import * as session from 'express-session';

import { AppModule } from './app.module';
import { sess } from './session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(session(sess));

  await app.listen(5000);
}
bootstrap();
