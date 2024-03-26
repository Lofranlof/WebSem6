import {
  IsInt,
  IsString,
  IsDate,
  ValidateNested,
  ArrayNotEmpty,
  IsNotEmpty,
} from 'class-validator';
import { Type } from 'class-transformer';
import { RecordDTO } from '../../record/dto/create-record.dto';
import { AchievementDTO } from '../../achievement/dto/create-achievement.dto';

export class UserDTO {
  @IsInt()
  id: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => RecordDTO)
  records: RecordDTO[];

  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => AchievementDTO)
  achievements: AchievementDTO[];

  @IsDate()
  registerDate: Date;
}
