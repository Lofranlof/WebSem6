import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { AchievementService } from './achievement.service';
import { AchievementDTO } from './dto/create-achievement.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('achievement')
@Controller('achievement')
export default class AchievementController {
  constructor(private readonly achievementService: AchievementService) {}

  @Get()
  getAllAchievements() {
    return this.achievementService.getAllAchievements();
  }
  @Get(':id')
  getAchievementByUserID(@Param('id') id: number) {
    return this.achievementService.getAchievementsByUserID(id);
  }

  @Post()
  async createAchievement(@Body() achievement: AchievementDTO) {
    return this.achievementService.createAchievement(achievement);
  }

  @Delete(':id')
  async deleteAchievement(@Param('id') id: number) {
    this.achievementService.deleteAchievement(id);
  }
}
