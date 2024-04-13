import { BadRequestException, Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { StatisticsService } from './statistics.service';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CreateStatisticsDTO } from "./dto/create-statistics.dto";

@ApiBearerAuth()
@ApiTags('statistics')
@Controller('statistics')
export default class TypeController {
  MAX_INT32 = 2147483647
  constructor(private readonly statisticsService: StatisticsService) {}
  @ApiOperation({ summary: "Get a statistics entry by ID" })
  @ApiParam({name: "id", type: "integer", required: true})
  @ApiResponse({
    status: 200,
    description: "Statistics entry has been fetched"
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
  async getStatisticsByID(@Param('id') id: number) {
    if (id > this.MAX_INT32 || id <= 0) {
      throw new BadRequestException(`ID ${id} is either too large or too small.`);
    }
    return this.statisticsService.getStatisticsByID(id);
  }

  @ApiOperation({ summary: "Create a statistics entry of a training record" })
  @ApiParam({name: "id", type: "integer", required: true})
  @ApiResponse({
    status: 201,
    description: "Statistics entry has been created successfully"
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
  @Post('record/:id')
  async createStatisticsOfRecord(@Body() statistics: CreateStatisticsDTO, id: number){
    if (id > this.MAX_INT32 || id <= 0) {
      throw new BadRequestException(`ID ${id} is either too large or too small.`);
    }
    return this.statisticsService.createStatisticsOfRecord(statistics, id);
  }

  @ApiOperation({ summary: "Delete the statistics entry" })
  @ApiParam({name: "id", type: "integer", required: true})
  @ApiResponse({
    status: 200,
    description: "The statistics entry has been deleted successfully"
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
  async deleteStatisticsByID(@Param('id') id: number) {
    if (id > this.MAX_INT32 || id <= 0) {
      throw new BadRequestException(`ID ${id} is either too large or too small.`);
    }
    return this.statisticsService.deleteStatisticsByID(id);
  }
}
