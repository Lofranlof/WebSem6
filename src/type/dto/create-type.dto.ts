import { IsInt, IsString, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { AchievementDTO } from '../../achievement/dto/create-achievement.dto';

export class TypeDTO {
  @IsInt()
  id: number;

  @IsString()
  title: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => AchievementDTO)
  achievement: AchievementDTO;
}
