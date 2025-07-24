import { Body, Controller, Patch } from "@nestjs/common";
import { UpdatePartialDto } from "src/application/dtos/user/update-partial.dto";
import { UpdatePartialUserUseCase } from "src/application/use-cases/user/update-partial.usecase";

@Controller('users')
export class UpdatePartialUserController {
  constructor(private readonly update: UpdatePartialUserUseCase) {}

  @Patch('update-partial')
  async updatePartialUser(@Body() data: UpdatePartialDto): Promise<any> {
    return await this.update.execute(data);
  } 
}