import { IsInt, IsString, IsOptional, ValidateNested, IsNotEmpty } from "class-validator";
import { Transform, TransformFnParams, Type } from "class-transformer";
import { CreateAchievementDTO } from '../../achievement/dto/create-achievement.dto';
import { ApiProperty } from "@nestjs/swagger";

export class CreateTypeDTO {
  @ApiProperty()
  id: number;

  @ApiProperty({required: true})
  @IsString()
  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsNotEmpty()
  title: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => CreateAchievementDTO)
  achievement: CreateAchievementDTO;
}
