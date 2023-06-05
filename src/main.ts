import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import * as session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // set up session middleware
  app.use(
    session({
      secret: 'secret',
      resave: false,
      saveUninitialized: false,
    }),
  );

  await app.listen(3000);
}

bootstrap().then(() => console.log('Server running on port 3000'));
