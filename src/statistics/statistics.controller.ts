import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import { StatisticsDTO } from './dto/create-statistics.dto';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiBearerAuth()
@ApiTags('statistics')
@Controller('statistics')
export default class TypeController {
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
    status: 500,
    description: "Internal error"
  })
  @Get(':id')
  getStatisticsByID(@Param('id') id: number) {
    return this.statisticsService.getStatisticsByID(id);
  }

  @ApiOperation({ summary: "Create a statistics entry of a training record" })
  @ApiParam({name: "id", type: "integer", required: true})
  @ApiParam({name: 'record', type: 'number'})
  @ApiResponse({
    status: 201,
    description: "Statistics entry has been created successfully"
  })
  @ApiResponse({
    status: 403,
    description: "Forbidden."
  })
  @ApiResponse({
    status: 500,
    description: "Internal error"
  })
  @Post('record/:id')
  async createStatisticsOfRecord(@Body() statistics: StatisticsDTO, id: number){
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
    status: 500,
    description: "Internal error"
  })
  @Delete(':id')
  async deleteStatisticsByID(@Param('id') id: number) {
    this.statisticsService.deleteStatisticsByID(id);
  }
}
