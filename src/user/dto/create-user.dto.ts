import {
  IsInt,
  IsString,
  IsDate,
  ValidateNested,
  IsNotEmpty, IsOptional, IsEmail, MinLength
} from "class-validator";
import { Exclude, Transform, TransformFnParams, Type } from "class-transformer";
import { CreateRecordDTO } from '../../record/dto/create-record.dto';
import { CreateAchievementDTO } from '../../achievement/dto/create-achievement.dto';
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDTO {
  @ApiProperty()
  id: number;

  @ApiProperty({required: true})
  @IsString()
  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsNotEmpty()
  name: string;

  @ApiProperty({required: false, default: []})
  @ValidateNested({ each: true })
  @Type(() => CreateRecordDTO)
  records: CreateRecordDTO[];

  @ApiProperty({required: false, default: []})
  @ValidateNested({ each: true })
  @Type(() => CreateAchievementDTO)
  achievements: CreateAchievementDTO[];

  @ApiProperty({required: true, default: "example@gmail.com"})
  @IsEmail()
  email: string

  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  @ApiProperty()
  password: string

  @ApiProperty({required: false})
  registerDate: Date;
}
