import { IsInt, IsDate, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { UserDTO } from '../../user/dto/create-user.dto';
import { TypeDTO } from '../../type/dto/create-type.dto';

export class AchievementDTO {
  @IsInt()
  id: number;

  @IsOptional()
  @ValidateNested()
  @Type(() => UserDTO)
  author?: UserDTO;

  @IsOptional()
  @IsInt()
  authorId?: number;

  @IsDate()
  achievedAt: Date;

  @ValidateNested()
  @Type(() => TypeDTO)
  type: TypeDTO;

  @IsInt()
  typeID: number;
}
