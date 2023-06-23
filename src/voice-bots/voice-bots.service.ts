import { Inject, Injectable } from '@nestjs/common';
import * as twilio from 'twilio';
import { Twilio } from 'twilio';
//import { TwilioProvider } from './twilio.provider';
import { DialogFlowProvider } from './dialogFlow.provider';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';
import { CallInstance } from 'twilio/lib/rest/api/v2010/account/call';
import VoiceResponse from 'twilio/lib/twiml/VoiceResponse';

@Injectable()
export class VoiceBotsService {
  constructor(
    @Inject('TWILIO') private readonly twilioProvider: Twilio,
    private readonly configService: ConfigService,
    private readonly dialogFlowProvider: DialogFlowProvider,
  ) {}

  /**
   *
   */
  async initTwilio(): Promise<CallInstance> {
    try {
      const res = await this.twilioProvider.calls.create({
        url: this.configService.get('twilio_webhook'),
        to: '+923454771299', //this will be dynamic number retrieve from DB
        from: this.configService.get('twilio_phone'),
      });
      console.log(res);
      return res;
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * @param request
   */
  async captureResponse(request: Request): Promise<VoiceResponse> {
    const twiml = new twilio.twiml.VoiceResponse();
    try {
      const host = request.headers['x-original-host'] || request.hostname;
      console.log(host);

      const connect = twiml.connect();
      connect.stream({ url: 'wss://' + host + '/media' });
      console.log(twiml.toString());
      return twiml;
    } catch (error) {
      console.error(error);
      twiml.say('Ohh, An error occurred. Please try again later.');
    }
  }

  /**
   * @param userInput
   * @private
   */
  private sendToDialogflow(userInput: string) {
    return new Promise((resolve, reject) => {
      this.dialogFlowProvider
        .getSessionClient()
        .detectIntent(this.dialogFlowProvider.getRequest(userInput))
        .then((responses: any) => {
          resolve(responses[0]);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
}
