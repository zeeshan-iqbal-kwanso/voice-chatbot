import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import * as Server from 'ws';

@WebSocketGateway(3200)
export class VoiceBotsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  /**
   * @param server
   */
  afterInit(server: WebSocket): any {
    console.log('server connected');
  }

  /**
   * @param client
   * @param args
   */
  handleConnection(client: WebSocket, ...args: any[]): any {
    /*client.on('message', (data) => {
      console.log(data); // Handle the media data received from Twilio
      const buffer = Buffer.from(data, 'utf8');
      const text = buffer.toString('utf8');
      console.log(text);
    });*/
  }

  @SubscribeMessage('message')
  onMessage(@MessageBody() data: string): any {
    console.log(data);
    // console.log(data);
  }

  /**
   * @param client
   */
  handleDisconnect(client: WebSocket): any {
    console.log('disconnected');
  }
}
