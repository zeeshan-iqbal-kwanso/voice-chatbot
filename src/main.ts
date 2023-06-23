import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import configuration from './config/configuration';
import * as dotenv from 'dotenv';
import * as express from 'express';
import { createServer } from 'http';
import { WsAdapter } from './voice-bots/ws-adapter';

dotenv.config();

async function bootstrap() {
  const port = configuration().port;
  const app = await NestFactory.create(AppModule);
  const server = createServer(app.getHttpAdapter().getInstance());
  app.useWebSocketAdapter(new WsAdapter(server));
  app.use(express.static('public'));
  await app.init();
  server.listen(port, () => {
    console.log(`App is running on port ${port}`);
  });
  /*await app
    .listen(port)
    .then(() => console.log(`App is running on port ${port}`))
    .catch((error: Error) => console.log(error));*/
}

bootstrap().then((r) => r);
