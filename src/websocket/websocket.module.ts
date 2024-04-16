import { Module } from '@nestjs/common';
import { ChatGateway } from './websocket.chat';
import { ChatController } from "./websocket.controller";

@Module({
  providers: [ChatGateway],
  controllers: [ChatController]
})
export class ChatModule {}