import { BadRequestException, Body, Controller, Delete, Get, Param, ParseIntPipe, Post } from "@nestjs/common";
import { RecordService } from './record.service';
import { CreateRecordDTO } from './dto/create-record.dto';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiBearerAuth()
@ApiTags('record')
@Controller('record')
export default class RecordController {
  MAX_INT32 = 2147483647
  constructor(private readonly recordService: RecordService) {}
  @ApiOperation({ summary: "Get a training record by ID" })
  @ApiParam({name: "id", type: "number", required: true})
  @ApiResponse({
    status: 200,
    description: "Training record has been fetched"
  })
  @ApiResponse({
    status: 403,
    description: "Forbidden."
  })
  @ApiResponse({
    status: 400,
    description: "Bad request"
  })
  @ApiResponse({
    status: 500,
    description: "Internal error"
  })
  @Get(':id')
  async getRecordsByID(@Param('id', ParseIntPipe) id: number) {
    if (id > this.MAX_INT32 || id <= 0) {
      throw new BadRequestException(`ID ${id} is either too large or too small.`);
    }
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
    status: 400,
    description: "Bad request"
  })
  @ApiResponse({
    status: 500,
    description: "Internal error"
  })
  @Post('user/:id')
  async createRecord(@Param('id', ParseIntPipe) id: number, @Body() record: CreateRecordDTO) {
    if (id > this.MAX_INT32 || id <= 0) {
      throw new BadRequestException(`ID ${id} is either too large or too small.`);
    }
    return this.recordService.createRecord(id, record);
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
    status: 400,
    description: "Bad request"
  })
  @ApiResponse({
    status: 500,
    description: "Internal error"
  })
  @Delete(':id')
  async deleteRecord(@Param('id', ParseIntPipe) id: number) {
    if (id > this.MAX_INT32 || id <= 0) {
      throw new BadRequestException(`ID ${id} is either too large or too small.`);
    }
    return this.recordService.deleteRecord(id);
  }
}
