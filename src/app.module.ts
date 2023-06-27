import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import Configuration from './config/configuration';
import { VoiceBotsModule } from './voice-bots/voice-bots.module';
import { VoiceBotsGateway } from './voice-bots/voice-bots.gateway';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { AuthProvider } from './auth/auth.provider';
import { OidcModule } from './oidc/oidc.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [Configuration],
      envFilePath: Configuration().env === 'prod' ? 'prod.env' : '.env',
    }),
    OidcModule.forRoot({
      issuer: '',

    }),
    VoiceBotsModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [VoiceBotsGateway, AppService, AuthProvider],
})
export class AppModule {}
