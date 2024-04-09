
import { CreateAchievementDTO } from "../dto/create-achievement.dto"
import { PartialType } from "@nestjs/swagger";

export class UpdateAchievementDTO extends PartialType(CreateAchievementDTO) {}