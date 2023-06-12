import { Module } from '@nestjs/common';
import { VoiceBotsService } from './voice-bots.service';
import { VoiceBotsController } from './voice-bots.controller';
import { TwilioProvider } from './twilio.provider';
import { DialogFlowProvider } from './dialogFlow.provider';
import { VoiceBotsGateway } from './voice-bots.gateway';

@Module({
  controllers: [VoiceBotsController],
  providers: [
    VoiceBotsService,
    TwilioProvider,
    DialogFlowProvider,
    VoiceBotsGateway,
  ],
  exports: [VoiceBotsService],
})
export class VoiceBotsModule {}
