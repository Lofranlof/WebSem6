import { IsInt } from 'class-validator';

export class StatisticsDTO {
  @IsInt()
  id: number;

  @IsInt()
  recordId: number;

  @IsInt()
  benchPress: number;

  @IsInt()
  deadLift: number;

  @IsInt()
  squat: number;
}
