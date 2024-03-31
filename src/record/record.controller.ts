import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { RecordService } from './record.service';
import { RecordDTO } from './dto/create-record.dto';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiBearerAuth()
@ApiTags('record')
@Controller('record')
export default class RecordController {
  constructor(private readonly recordService: RecordService) {}
  @ApiOperation({ summary: "Get a training record by ID" })
  @ApiParam({name: "id", type: "integer", required: true})
  @ApiResponse({
    status: 200,
    description: "Training record has been fetched"
  })
  @ApiResponse({
    status: 403,
    description: "Forbidden."
  })
  @ApiResponse({
    status: 500,
    description: "Internal error"
  })
  @Get(':id')
  getRecordsByID(@Param('id') id: number) {
    return this.recordService.getRecordsByID(id);
  }

  @ApiOperation({ summary: "Create new training record of a user" })
  @ApiParam({name: "id", type: "integer", required: true})
  @ApiResponse({
    status: 201,
    description: "The Record has been created successfully"
  })
  @ApiResponse({
    status: 403,
    description: "Forbidden."
  })
  @ApiResponse({
    status: 500,
    description: "Internal error"
  })
  @Post('user/:id')
  async createRecord(@Body() record: RecordDTO) {
    return this.recordService.createRecord(record);
  }

  @ApiOperation({ summary: "Delete the training record" })
  @ApiParam({name: "id", type: "integer", required: true})
  @ApiResponse({
    status: 200,
    description: "The training record has been deleted successfully"
  })
  @ApiResponse({
    status: 403,
    description: "Forbidden."
  })
  @ApiResponse({
    status: 500,
    description: "Internal error"
  })
  @Delete(':id')
  async deleteRecord(@Param('id') id: number) {
    this.recordService.deleteRecord(id);
  }
}
