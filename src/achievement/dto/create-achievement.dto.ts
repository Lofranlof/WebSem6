import { IsInt, IsDate, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateUserDTO } from '../../user/dto/create-user.dto';
import { CreateTypeDTO } from '../../type/dto/create-type.dto';
import { ApiProperty } from "@nestjs/swagger";

export class CreateAchievementDTO {
  @ApiProperty()
  id: number;

  @IsOptional()
  @Type(() => CreateUserDTO)
  author?: CreateUserDTO;

  @IsOptional()
  @IsInt()
  authorId?: number;

  @ApiProperty({required: false})
  achievedAt: Date;

  @Type(() => CreateTypeDTO)
  type: CreateTypeDTO;

  @IsInt()
  typeID: number;
}
