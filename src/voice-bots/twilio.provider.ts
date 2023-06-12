import { Provider } from '@nestjs/common';
import { Twilio } from 'twilio';
import { ConfigService } from '@nestjs/config';

export const TwilioProvider: Provider = {
  provide: 'TWILIO',
  useFactory: (configService: ConfigService) => {
    return new Twilio(
      configService.get('twilio_account_sid'),
      configService.get('twilio_auth_token'),
    );
  },
  inject: [ConfigService],
};
