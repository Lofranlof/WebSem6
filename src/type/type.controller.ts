import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Patch,
  Query,
  ParseIntPipe,
  BadRequestException
} from "@nestjs/common";
import { TypeService } from './type.service';
import { CreateTypeDTO } from './dto/create-type.dto';
import { UpdateTypeDTO } from './dto/update-type.dto';

import { ApiBearerAuth, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";
import { PaginationParamsDto } from "../common/dto/pagination.dto";

@ApiBearerAuth()
@ApiTags('type')
@Controller('type')
export default class TypeController {
  MAX_INT32 = 2147483647

  constructor(private readonly typeService: TypeService) {}
  @ApiOperation({ summary: "Get all types" })
  @ApiQuery({ name: 'offset', type: 'number'})
  @ApiQuery({ name: 'limit', type: 'number'})
  @ApiResponse({
    status: 200,
    description: "All types have been fetched"
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
  async getAllTypes(@Query() { offset, limit }: PaginationParamsDto) {
    if (offset > this.MAX_INT32 || offset <= 0 || limit > this.MAX_INT32 || limit <= 0) {
      throw new BadRequestException(`ID ${offset} or ${limit} is either too large or too small.`);
    }
    return this.typeService.getAllTypes(offset, limit);
  }
  @ApiOperation({ summary: "Get type by name" })
  @ApiResponse({
    status: 200,
    description: "The Type has been fetched"
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
  async getTypeById(@Param('id', ParseIntPipe) id: number) {
    if (id > this.MAX_INT32 || id <= 0) {
      throw new BadRequestException(`ID ${id} is either too large or too small.`);
    }
    return this.typeService.getTypeById(id);
  }
  @ApiOperation({ summary: "Create a new type" })
  @ApiResponse({
    status: 201,
    description: "The Type has been created successfully"
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
  @Post()
  async createType(@Body() type: CreateTypeDTO) {
    return this.typeService.createType(type);
  }

  @ApiOperation({ summary: "Update the type" })
  @ApiResponse({
    status: 200,
    description: "The Type has been updated successfully"
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
  @Patch(':id')
  async updateType(@Param('id', ParseIntPipe) id: number, @Body() type: UpdateTypeDTO) {
    if (id > this.MAX_INT32 || id <= 0) {
      throw new BadRequestException(`ID ${id} is either too large or too small.`);
    }
    return this.typeService.updateType(id, type);
  }

  @ApiOperation({ summary: "Delete the type" })
  @ApiResponse({
    status: 200,
    description: "The Type has been deleted successfully"
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
  async deleteType(@Param('id', ParseIntPipe) id: number) {
    if (id > this.MAX_INT32 || id <= 0) {
      throw new BadRequestException(`ID ${id} is either too large or too small.`);
    }
    return this.typeService.deleteType(id);
  }
}
