import { Injectable, NotImplementedException } from "@nestjs/common";
import { CreateStatisticsDTO} from "./dto/create-statistics.dto";
import { UpdateStatisticsDTO} from "./dto/update-statistics.dto";
import { PrismaService } from "../prisma/prisma.service";
import { Prisma } from "@prisma/client";

@Injectable()
export class StatisticsService {
  constructor(private prisma: PrismaService) {}

  async getStatisticsByID(id: number) {
    return this.prisma.statistics.findUnique({
      where: { id },
      include: {
        record: true,
      },
    })
  }

  async createStatisticsOfRecord(createStatisticsDTO: CreateStatisticsDTO, id: number) {
    const statRecord = this.prisma.record.findUnique({where: {id}})
    const statisticsData: Prisma.StatisticsCreateInput = {
      record: createStatisticsDTO.record ? {}: undefined,
      becnhPress: createStatisticsDTO.benchPress,
      squat: createStatisticsDTO.squat,
      deadLift: createStatisticsDTO.deadLift,
    }
    return this.prisma.statistics.create({ data: statisticsData });
  }

  async deleteStatisticsByID(id: number) {
    return this.prisma.statistics.delete({ where: {id} });
  }
}
