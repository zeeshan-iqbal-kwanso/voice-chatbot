import { Injectable } from '@nestjs/common';
import dialogflow, { SessionsClient } from '@google-cloud/dialogflow';
import { ConfigService } from '@nestjs/config';
import { v4 as uuid } from 'uuid';

@Injectable()
export class DialogFlowProvider {
  /** @private sessionClient: SessionsClient */
  sessionClient: SessionsClient;

  /** @private sessionPath: string */
  sessionPath: string;

  /**
   * @param configService
   */
  constructor(private readonly configService: ConfigService) {
    this.sessionClient = new dialogflow.SessionsClient();
    this.setSessionPath();
  }

  /**
   *
   */
  setSessionPath() {
    this.sessionPath = this.sessionClient.projectAgentSessionPath(
      this.configService.get('dialogflow_project_id'),
      uuid(),
    );
  }

  /**
   *
   */
  getSessionClient(): SessionsClient {
    return this.sessionClient;
  }

  /**
   *
   */
  getSessionPath(): string {
    return this.sessionPath;
  }

  getRequest(userInput: string) {
    return {
      session: this.sessionPath,
      queryInput: { text: { text: userInput, languageCode: 'en-US' } },
    };
  }
}
