import { Injectable, NotImplementedException } from '@nestjs/common';
import { AchievementDTO } from './dto/create-achievement.dto';

@Injectable()
export class AchievementService {
  getAllAchievements() {
    throw new NotImplementedException();
  }

  getAchievementsByUserID(id: number) {
    throw new NotImplementedException(id);
  }

  createAchievement(achievement: AchievementDTO) {
    throw new NotImplementedException(achievement);
  }

  deleteAchievement(id: number) {
    throw new NotImplementedException(id);
  }
}
