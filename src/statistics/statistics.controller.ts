import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import { StatisticsDTO } from './dto/create-statistics.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('statistics')
@Controller('statistics')
export default class TypeController {
  constructor(private readonly statisticsService: StatisticsService) {}
  @Get(':record:id')
  getStatisticsByRecordID(@Param('id') id: number) {
    return this.statisticsService.getStatisticsByRecordID(id);
  }

  @Post(':record:id')
  async createStatisticsOfRecord(
    @Body() statistics: StatisticsDTO,
    id: number,
  ) {
    return this.statisticsService.createStatisticsOfRecord(statistics, id);
  }

  @Delete(':record:id')
  async deleteStatisticsByRecordID(@Param('id') id: number) {
    this.statisticsService.deleteStatisticsByRecordID(id);
  }
}
