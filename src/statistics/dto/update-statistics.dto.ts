
import { CreateStatisticsDTO } from "../dto/create-statistics.dto"
import { PartialType } from "@nestjs/swagger";

export class UpdateStatisticsDTO extends PartialType(CreateStatisticsDTO) {}