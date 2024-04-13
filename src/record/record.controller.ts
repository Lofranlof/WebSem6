import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post, Query
} from "@nestjs/common";
import { RecordService } from './record.service';
import { CreateRecordDTO } from './dto/create-record.dto';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";
import { PaginationParamsDto } from "../common/dto/pagination.dto";

@ApiBearerAuth()
@ApiTags('record')
@Controller('record')
export default class RecordController {
  MAX_INT32 = 2147483647
  constructor(private readonly recordService: RecordService) {}

  @ApiOperation({ summary: "Get all records" })
  @ApiQuery({ name: 'offset', type: 'number'})
  @ApiQuery({ name: 'limit', type: 'number'})

  @ApiResponse({
    status: 200,
    description: "All users have been fetched"
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
  @Get()
  async getAllRecords(@Query() { offset, limit }: PaginationParamsDto) {
    if (offset > this.MAX_INT32 || offset < 0 || limit > this.MAX_INT32 || limit < 0) {
      throw new BadRequestException(`ID ${offset} or ${limit} is either too large or too small.`);
    }
    return this.recordService.getAllRecords(offset, limit);
  }
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
    const record = await this.recordService.getRecordsByID(id);
    if (!record) {
      throw new NotFoundException(`Record with ${id} does not exist!`);
    }
    return record;
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
