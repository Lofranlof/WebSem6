import { Injectable, NotImplementedException } from '@nestjs/common';
import { CreateAchievementDTO } from "./dto/create-achievement.dto";
import { PrismaService } from "../prisma/prisma.service";
import { Prisma } from "@prisma/client";
import { UpdateAchievementDTO } from "./dto/update-achievement.dto";

@Injectable()
export class AchievementService {
  constructor(private prisma: PrismaService) {}

  async getAllAchievements(offset?: number, limit?: number) {
    return this.prisma.achievement.findMany({
      take: limit,
      skip: offset,
    });
  }

  async getAchievementsByID(id: number) {
    return this.prisma.achievement.findUnique({where: {id}})
  }

  async createAchievement(createAchievementDTO: CreateAchievementDTO) {
    const achievementData: Prisma.AchievementCreateInput = {
      author: createAchievementDTO.author ? {} : undefined,
      type: createAchievementDTO.type ? {} : undefined,
    }
    return this.prisma.achievement.create({ data: achievementData });  }

  async deleteAchievement(id: number) {
    return this.prisma.achievement.delete({where: {id} })
  }

  async updateAchievement(id: number, updateAchievementDTO: UpdateAchievementDTO) {
    const achievementData: Prisma.AchievementCreateInput = {
      author: updateAchievementDTO.author ? {} : undefined,
      type: updateAchievementDTO.type ? {} : undefined,
    }
    return this.prisma.achievement.update({
      where: { id },
      data: achievementData,
    });
  }
}
