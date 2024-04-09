
import { CreateUserDTO } from "../dto/create-user.dto"
import { PartialType } from "@nestjs/swagger";

export class UpdateUserDTO extends PartialType(CreateUserDTO) {}