import { IsInt } from 'class-validator';
import { CreateRecordDTO } from "../../record/dto/create-record.dto";

export class CreateStatisticsDTO {
  @IsInt()
  id: number;

  record: CreateRecordDTO;

  @IsInt()
  benchPress: number;

  @IsInt()
  deadLift: number;

  @IsInt()
  squat: number;
}
