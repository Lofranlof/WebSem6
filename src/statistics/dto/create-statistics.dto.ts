import { IsInt } from 'class-validator';
import { CreateRecordDTO } from "../../record/dto/create-record.dto";
import { ApiProperty } from "@nestjs/swagger";

export class CreateStatisticsDTO {
  @ApiProperty()
  id: number;

  record: CreateRecordDTO;


  @ApiProperty({required: true, default: 10})
  @IsInt()
  benchPress: number

  @ApiProperty({required: true, default: 10})
  @IsInt()
  deadLift: number;

  @ApiProperty({required: true, default: 10})
  @IsInt()
  squat: number;
}
