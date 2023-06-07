import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import Configuration from './config/configuration';
import { VoiceBotsModule } from './voice-bots/voice-bots.module';
import { VoiceBotsGateway } from './voice-bots/voice-bots.gateway';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [Configuration],
      envFilePath: Configuration().env === 'prod' ? 'prod.env' : '.env',
    }),
    VoiceBotsModule,
  ],
  controllers: [AppController],
  providers: [VoiceBotsGateway, AppService],
})
export class AppModule {}
