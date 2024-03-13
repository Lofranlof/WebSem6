import {
  IsInt,
  IsString,
  IsBoolean,
  IsOptional,
  IsDate,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { UserDTO } from '../../user/dto/create-user.dto';
import { StatisticsDTO } from '../../statistics/dto/create-statistics.dto';

export class RecordDTO {
  @IsInt()
  id: number;

  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  content?: string;

  @IsOptional()
  @IsBoolean()
  published?: boolean;

  @IsOptional()
  @ValidateNested()
  @Type(() => UserDTO)
  author?: UserDTO;

  @IsOptional()
  @IsInt()
  authorId?: number;

  @IsDate()
  createdAt: Date;

  @IsOptional()
  @ValidateNested()
  @Type(() => StatisticsDTO)
  stats?: StatisticsDTO;

  @IsOptional()
  @IsInt()
  statId?: number;
}
