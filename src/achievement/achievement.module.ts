import { Module } from '@nestjs/common';
import AchievementController from './achievement.controller';
import { AchievementService } from './achievement.service';
import { PrismaModule } from "../prisma/prisma.module";

@Module({
  controllers: [AchievementController],
  providers: [AchievementService],
  imports: [PrismaModule]
})
export class AchievementModule {}
