import { IsInt } from 'class-validator';
import { RecordDTO } from "../../record/dto/create-record.dto";

export class CreateStatisticsDTO {
  @IsInt()
  id: number;

  record: RecordDTO;

  @IsInt()
  benchPress: number;

  @IsInt()
  deadLift: number;

  @IsInt()
  squat: number;
}
