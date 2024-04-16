import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Controller, Get, Render } from '@nestjs/common';
@ApiTags('Chat')
@Controller()
export class ChatController{
  @ApiOperation({ summary: 'Enter message', })
  @Get('chat')
  @Render('chat')
  showMessages() {
    return;
  }
}