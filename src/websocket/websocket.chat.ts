import { WebSocketGateway, WebSocketServer, SubscribeMessage } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway()
export class ChatGateway {
  @WebSocketServer() server: Server;

  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): void {
    this.server.emit('message', payload);
  }
}