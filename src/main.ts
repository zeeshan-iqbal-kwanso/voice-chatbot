import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import configuration from './config/configuration';
import * as dotenv from 'dotenv';
import * as express from 'express';
import { WsAdapter } from '@nestjs/platform-ws';
dotenv.config();

async function bootstrap() {
  const port = configuration().port;
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useWebSocketAdapter(new WsAdapter(app));
  app.use(express.static('public'));

  await app
    .listen(port)
    .then(() => console.log(`App is running on port ${port}`))
    .catch((error: Error) => console.log(error));
}

bootstrap().then((r) => r);
