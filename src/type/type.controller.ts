import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { TypeService } from './type.service';
import { TypeDTO } from './dto/create-type.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('type')
@Controller('type')
export default class TypeController {
  constructor(private readonly typeService: TypeService) {}

  @Get()
  getAllTypes() {
    return this.typeService.getAllTypes();
  }
  @Get(':name')
  getTypeByName(@Param('name') name: string) {
    return this.typeService.getTypeByName(name);
  }

  @Post()
  async createType(@Body() type: TypeDTO) {
    return this.typeService.createType(type);
  }

  @Delete(':name')
  async deleteType(@Param('name') name: string) {
    this.typeService.deleteType(name);
  }
}
