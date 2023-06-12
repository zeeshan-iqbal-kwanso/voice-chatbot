import { Server } from 'ws';
import { IoAdapter } from '@nestjs/platform-socket.io';
import * as http from 'http';

export class WsAdapter extends IoAdapter {
  protected ioServer: Server;
  constructor(protected server: http.Server) {
    super();
    //console.log(server);
    this.ioServer = new Server({ server });
    console.log(this.ioServer);
  }
}
