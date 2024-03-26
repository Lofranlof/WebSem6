import { User } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { RecordDTO } from '../record/dto/create-record.dto';
import { AchievementDTO } from '../achievement/dto/create-achievement.dto';

export class UserEntity implements User {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  records: RecordDTO[];

  @ApiProperty()
  achievements: AchievementDTO[];

  @ApiProperty()
  registerDate: Date;
}
