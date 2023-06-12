import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import configuration from './config/configuration';
import * as dotenv from 'dotenv';
import * as express from 'express';
import * as http from 'http';
import { WsAdapter } from './voice-bots/ws-adapter';
//import { WsAdapter } from '@nestjs/platform-ws';
dotenv.config();

async function bootstrap() {
  const port = configuration().port;
  const expressApp = express();
  const server = http.createServer(expressApp);
  const app = await NestFactory.create(AppModule);
  app.useWebSocketAdapter(new WsAdapter(server));
  app.use(express.static('public'));
  await app.init();
  server.listen(port);
  /*await app
    .listen(port)
    .then(() => console.log(`App is running on port ${port}`))
    .catch((error: Error) => console.log(error));*/
}

bootstrap().then((r) => r);
