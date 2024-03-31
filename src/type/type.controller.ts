import { Body, Controller, Delete, Get, Param, Post, Patch} from '@nestjs/common';
import { TypeService } from './type.service';
import { TypeDTO } from './dto/create-type.dto';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { UserDTO } from "../user/dto/create-user.dto";

@ApiBearerAuth()
@ApiTags('type')
@Controller('type')
export default class TypeController {
  constructor(private readonly typeService: TypeService) {}
  @ApiOperation({ summary: "Get all types" })
  @ApiResponse({
    status: 200,
    description: "All types have been fetched"
  })
  @ApiResponse({
    status: 403,
    description: "Forbidden."
  })
  @ApiResponse({
    status: 500,
    description: "Internal error"
  })
  @Get()
  getAllTypes() {
    return this.typeService.getAllTypes();
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
    status: 500,
    description: "Internal error"
  })
  @Get(':name')
  getTypeByName(@Param('name') name: string) {
    return this.typeService.getTypeByName(name);
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
    status: 500,
    description: "Internal error"
  })
  @Post()
  async createType(@Body() type: TypeDTO) {
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
    status: 500,
    description: "Internal error"
  })
  @Patch(':name')
  updateUser(@Param('name') name: string, @Body() type: TypeDTO) {
    return this.typeService.updateType(type);
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
    status: 500,
    description: "Internal error"
  })
  @Delete(':name')
  async deleteType(@Param('name') name: string) {
    this.typeService.deleteType(name);
  }
}
