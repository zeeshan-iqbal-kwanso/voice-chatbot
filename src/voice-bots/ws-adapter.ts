import { Server } from 'ws';
import * as http from 'http';
import { WebSocketAdapter } from '@nestjs/common';
import { IoAdapter } from '@nestjs/platform-socket.io';

export class WsAdapter extends IoAdapter implements WebSocketAdapter {
  /** @protected client: Server */
  protected client: Server;

  /**
   * @param server
   */
  constructor(protected server: http.Server) {
    super();
    this.client = server;
  }

  /**
   * @param server
   * @param callback
   */
  bindClientConnect(server: Server, callback: any): any {
    server.on('connection', (socket: any) => {
      callback(socket);
    });
  }

  /**
   * @param client
   * @param callback
   */
  bindClientDisconnect(client: any, callback: any) {
    //console.log('client disconnected');
    callback(client);
  }

  /**
   * @param port
   * @param options
   * @return Server
   */
  create(port: number, options?: any): Server {
    return new Server({ server: this.server });
  }
}
