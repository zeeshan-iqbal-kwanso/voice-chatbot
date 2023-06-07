import { Injectable } from '@nestjs/common';
import { Twilio } from 'twilio';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TwilioProvider {
  /** @private client: Twilio */
  private readonly client: Twilio;

  /**
   * @param configService
   */
  constructor(private readonly configService: ConfigService) {
    this.client = new Twilio(
      configService.get('twilio_account_sid'),
      configService.get('twilio_auth_token'),
    );
  }

  /**
   *
   */
  getClient(): Twilio {
    return this.client;
  }
}
