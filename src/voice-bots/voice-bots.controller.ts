import { Controller, Get, Post, Req, Res } from '@nestjs/common';
import { VoiceBotsService } from './voice-bots.service';
import { Request, Response } from 'express';
import { CallInstance } from 'twilio/lib/rest/api/v2010/account/call';

@Controller('voice-bots')
export class VoiceBotsController {
  /**
   * @param voiceBotsService
   */
  constructor(private readonly voiceBotsService: VoiceBotsService) {}

  /**
   * @param request
   * @param response
   * @return Response
   */
  @Post('/webhook')
  async hook(
    @Req() request: Request,
    @Res() response: Response,
  ): Promise<Response> {
    response.setHeader('Content-Type', 'application/xml');
    const res = await this.voiceBotsService.captureResponse(request);
    return response.send(res.toString());
  }

  /**
   * @return CallInstance
   */
  @Get('/init')
  init(): Promise<CallInstance> {
    return this.voiceBotsService.initTwilio();
  }
}
