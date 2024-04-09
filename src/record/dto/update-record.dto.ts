
import { CreateRecordDTO } from "../dto/create-record.dto"
import { PartialType } from "@nestjs/swagger";

export class UpdateCreateDTO extends PartialType(CreateRecordDTO) {}