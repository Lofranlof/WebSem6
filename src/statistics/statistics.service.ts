import { Injectable, NotImplementedException } from "@nestjs/common";
import { StatisticsDTO } from "./dto/create-statistics.dto";

@Injectable()
export class StatisticsService {
  getStatisticsByID(id: number) {
    throw new NotImplementedException(id);
  }

  createStatisticsOfRecord(statistics: StatisticsDTO, id: number) {
    throw new NotImplementedException(statistics);
  }

  deleteStatisticsByID(id: number) {
    throw new NotImplementedException(id);
  }
}
