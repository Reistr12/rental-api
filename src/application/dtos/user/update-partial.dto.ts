import { updateUserDto } from "./update-user.dto"
import { PartialType } from "@nestjs/mapped-types";

export class UpdatePartialDto extends PartialType(updateUserDto)  {}