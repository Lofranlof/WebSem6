import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post
} from "@nestjs/common";
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
  async getStatisticsByID(@Param('id', ParseIntPipe) id: number) {
    if (id > this.MAX_INT32 || id <= 0) {
      throw new BadRequestException(`ID ${id} is either too large or too small.`);
    }
    const stat = await this.statisticsService.getStatisticsByID(id);
    if (!stat) {
      throw new NotFoundException(`statistics with ${id} does not exist!`);
    }
    return stat;
  }

  @ApiOperation({ summary: "Create a statistics entry of a training record" })
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
  async createStatisticsOfRecord(@Body() statistics: CreateStatisticsDTO, @Param('id', ParseIntPipe) id: number){
    if (id > this.MAX_INT32 || id <= 0) {
      throw new BadRequestException(`ID ${id} is either too large or too small.`);
    }
    if (statistics.benchPress > 400 || statistics.benchPress <= 0) {
      throw new BadRequestException(`Enter a valid positive result for bench in kg's, ${statistics.benchPress} is not valid`);
    }
    if (statistics.squat > 450 || statistics.squat <= 0) {
      throw new BadRequestException(`Enter a valid result for squat in kg's, ${statistics.squat} is not valid`);
    }
    if (statistics.deadLift > 500 || statistics.deadLift <= 0) {
      throw new BadRequestException(`Enter a valid result for deadl in kg's, ${statistics.deadLift} is not valid`);
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
  async deleteStatisticsByID(@Param('id', ParseIntPipe) id: number) {
    if (id > this.MAX_INT32 || id <= 0) {
      throw new BadRequestException(`ID ${id} is either too large or too small.`);
    }
    return this.statisticsService.deleteStatisticsByID(id);
  }
}
