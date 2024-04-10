import { IsInt, IsString, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateAchievementDTO } from '../../achievement/dto/create-achievement.dto';

export class CreateTypeDTO {
  @IsInt()
  id: number;

  @IsString()
  title: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => CreateAchievementDTO)
  achievement: CreateAchievementDTO;
}
