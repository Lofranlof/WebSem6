import { Body, Controller, Delete, Get, Param, Post, Patch, Query, ParseIntPipe } from "@nestjs/common";
import { TypeService } from './type.service';
import { CreateTypeDTO } from './dto/create-type.dto';
import { UpdateTypeDTO } from './dto/update-type.dto';

import { ApiBearerAuth, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";
import { PaginationParamsDto } from "../common/dto/pagination.dto";

@ApiBearerAuth()
@ApiTags('type')
@Controller('type')
export default class TypeController {
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
  getAllTypes(@Query() { offset, limit }: PaginationParamsDto) {
    return this.typeService.getAllTypes(offset, limit);
  }
  @ApiOperation({ summary: "Get type by name" })
  @ApiParam({name: "name", type: "string", required: true})
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
  getTypeById(@Param('id', ParseIntPipe) id: number) {
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
  @ApiParam({name: "name", type: "string", required: true})
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
  updateType(@Param('id', ParseIntPipe) id: number, @Body() type: UpdateTypeDTO) {
    return this.typeService.updateType(id, type);
  }

  @ApiOperation({ summary: "Delete the type" })
  @ApiParam({name: "name", type: "string", required: true})
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
    this.typeService.deleteType(id);
  }
}
