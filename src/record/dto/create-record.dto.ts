import {
  IsInt,
  IsString,
  IsBoolean,
  IsOptional,
  IsDate,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateUserDTO } from '../../user/dto/create-user.dto';
import { CreateStatisticsDTO } from '../../statistics/dto/create-statistics.dto';

export class CreateRecordDTO {
  @IsInt()
  id: number;

  @IsString()
  title: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => CreateUserDTO)
  author?: CreateUserDTO;

  @IsOptional()
  @IsInt()
  authorId?: number;

  @IsDate()
  createdAt: Date;

  @IsOptional()
  @ValidateNested()
  @Type(() => CreateStatisticsDTO)
  stats?: CreateStatisticsDTO;

  @IsOptional()
  @IsInt()
  statId?: number;
}
