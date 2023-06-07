import * as WebSocket from 'ws';
import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@WebSocketGateway(8080)
export class VoiceBotsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: WebSocket;

  afterInit(server: WebSocket): any {
    console.log('server connected');
  }

  handleConnection(client: WebSocket, ...args: any[]): any {
    console.log('handler');
    client.on('message', (data) => {
      console.log(data); // Handle the media data received from Twilio
      const buffer = Buffer.from(data, 'utf8');
      const text = buffer.toString('utf8');
      console.log(text);
    });
  }

  handleDisconnect(client: any): any {
    console.log('disconnected');
  }

  /**
   * @param data
   */
  @SubscribeMessage('events')
  onEvent(@MessageBody() data: unknown): Observable<WsResponse<number>> {
    console.log(data);
    const event = 'events';
    const response = [1, 2, 3];

    return from(response).pipe(map((data) => ({ event, data })));
  }
}
