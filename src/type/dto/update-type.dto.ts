
import { CreateTypeDTO } from "../dto/create-type.dto"
import { PartialType } from "@nestjs/swagger";

export class UpdateTypeDTO extends PartialType(CreateTypeDTO) {}