import { Injectable } from '@nestjs/common';
import Provider from 'oidc-provider';

@Injectable()
export class AuthProvider {
  constructor() {
    const configuration = {
      // Replace with your own values
      clients: [
        {
          client_id: 'client1',
          client_secret: 'secret1',
          redirect_uris: ['https://your-app/callback'],
          grant_types: ['authorization_code'],
        },
      ],
    };
    const oidc = new Provider('http://localhost:3000', configuration);
  }
}
