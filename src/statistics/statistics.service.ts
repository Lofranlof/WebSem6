import { Injectable, NotImplementedException } from "@nestjs/common";
import { StatisticsDTO } from "./dto/create-statistics.dto";

@Injectable()
export class StatisticsService {
  getStatisticsByRecordID(id: number) {
    throw new NotImplementedException(id);
  }

  createStatisticsOfRecord(statistics: StatisticsDTO, id: number) {
    throw new NotImplementedException(statistics);
  }

  deleteStatisticsByRecordID(id: number) {
    throw new NotImplementedException(id);
  }
}
