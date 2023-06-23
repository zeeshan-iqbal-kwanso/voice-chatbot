import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'ws';

@WebSocketGateway(3200)
export class VoiceBotsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  /**
   * @param socket
   */
  afterInit(socket: Server): any {
    console.log('server connected');
  }

  /**
   * @param socket
   * @param args
   */
  handleConnection(socket: Server, ...args: any[]): any {
    /*client.on('message', (data) => {
      console.log(JSON.parse(data));
    });*/
  }

  /**
   * @param socket
   * @param messageEvent
   */
  @SubscribeMessage('message')
  onMessage(socket: Server, messageEvent: MessageEvent): any {
    const data = JSON.parse(messageEvent.data);
    console.log(data);
  }

  /**
   * @param socket
   */
  handleDisconnect(socket: Server): any {
    console.log('disconnected');
  }
}
