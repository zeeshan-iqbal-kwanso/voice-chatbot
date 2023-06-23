import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-oauth2';

@Injectable()
export class AuthProvider extends PassportStrategy(Strategy, 'oauth2') {
  constructor() {
    super({
      authorizationURL: 'https://example.com/oauth2/authorize',
      tokenURL: 'https://example.com/oauth2/token',
      clientID: 'your-client-id',
      clientSecret: 'your-client-secret',
      callbackURL: 'http://localhost:3000/auth/callback',
    });
  }

  async validate(
    request: any,
    clientId: string,
    clientSecret: string,
    callbackURL: string,
  ) {
    console.log('11111111111111111sadqwdqcxwqcwqcq');
    // Here, you can perform validation of client credentials and callback URL.
    // You can customize this method to suit your needs.
    const isValid = true; // Perform your validation logic here
    return isValid;
  }
}
