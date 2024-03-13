import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { RecordService } from './record.service';
import { RecordDTO } from './dto/create-record.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('record')
@Controller('record')
export default class RecordController {
  constructor(private readonly recordService: RecordService) {}
  @Get(':user:id')
  getRecordsByUserID(@Param('id') id: number) {
    return this.recordService.getRecordsByUserID(id);
  }

  @Post()
  async createUser(@Body() user: RecordDTO) {
    return this.recordService.createRecord(user);
  }

  @Delete(':id')
  async deleteRecord(@Param('id') id: number) {
    this.recordService.deleteRecord(id);
  }
}
