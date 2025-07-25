import { Body, Controller, Patch, UseGuards } from "@nestjs/common";
import { UpdatePartialDto } from "src/application/dtos/user/update-partial.dto";
import { UpdatePartialUserUseCase } from "src/application/use-cases/user/update-partial.usecase";
import { AuthGuard } from "src/auth/auth.guard";

@Controller('users')
export class UpdatePartialUserController {
  constructor(private readonly update: UpdatePartialUserUseCase) {}

  @UseGuards(AuthGuard)
  @Patch('update-partial')
  async updatePartialUser(@Body() data: UpdatePartialDto): Promise<any> {
    return await this.update.execute(data);
  } 
}