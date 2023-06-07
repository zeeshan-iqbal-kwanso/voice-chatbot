import { Controller, Get, Post, Req, Res } from '@nestjs/common';
import { VoiceBotsService } from './voice-bots.service';
import { Request, Response } from 'express';

@Controller('voice-bots')
export class VoiceBotsController {
  constructor(private readonly voiceBotsService: VoiceBotsService) {}

  @Post('/webhook')
  async hook(@Req() request: Request, @Res() response: Response) {
    response.setHeader('Content-Type', 'application/xml');
    return this.voiceBotsService.captureResponse(request);
  }

  @Get('/init')
  init() {
    return this.voiceBotsService.initTwilio();
  }
}
