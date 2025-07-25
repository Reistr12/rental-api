import { Body, Controller, Param, Patch, UseGuards } from "@nestjs/common";
import { UpdatePartialDto } from "src/application/dtos/user/update-partial.dto";
import { UpdatePartialUserUseCase } from "src/application/use-cases/user/update-partial.usecase";
import { AuthGuard } from "src/auth/auth.guard";
import { CurrentUser } from "src/common/decorators/current-user.decorator";

@Controller('users')
export class UpdatePartialUserController {
  constructor(private readonly update: UpdatePartialUserUseCase) {}


  @UseGuards(AuthGuard)
  @Patch('update/:id')
  async updateUser(@Param('id')id: string, @Body() data: UpdatePartialDto, @CurrentUser() userInfo:string): Promise<void> {   
    return await this.update.execute(data, userInfo, id);
  }
}