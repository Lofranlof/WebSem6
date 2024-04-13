import {
  IsInt,
  IsString,
  IsBoolean,
  IsOptional,
  IsDate,
  ValidateNested, IsNotEmpty
} from "class-validator";
import { Transform, TransformFnParams, Type } from "class-transformer";
import { CreateUserDTO } from '../../user/dto/create-user.dto';
import { CreateStatisticsDTO } from '../../statistics/dto/create-statistics.dto';
import { ApiProperty } from "@nestjs/swagger";

export class CreateRecordDTO {
  @ApiProperty()
  id: number;

  @ApiProperty({required: true, default: "My new record entry"})
  @IsString()
  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsNotEmpty()
  title: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => CreateUserDTO)
  author?: CreateUserDTO;

  @IsOptional()
  @IsInt()
  authorId?: number;

  @ApiProperty({required: false})
  createdAt: Date;

  @IsOptional()
  @ValidateNested()
  @Type(() => CreateStatisticsDTO)
  stats?: CreateStatisticsDTO;

  @IsOptional()
  @IsInt()
  statId?: number;
}
