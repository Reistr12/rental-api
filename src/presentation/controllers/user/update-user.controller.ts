import { Body, Controller, Param, Put, UseGuards } from "@nestjs/common";
import { userInfo } from "os";
import { updateUserDto } from "src/application/dtos/user/update-user.dto";
import { UpdateUserUseCase } from "src/application/use-cases/user/update-user.usecase";
import { AuthGuard } from "src/auth/auth.guard";
import { CurrentUser } from "src/common/decorators/current-user.decorator";

@Controller('users')
export class UpdateUserController {
  constructor(private readonly updateUserUseCase: UpdateUserUseCase) {}

  @UseGuards(AuthGuard)
  @Put('update/:id')
  async updateUser(@Param('id')id: string, @Body() data: updateUserDto, @CurrentUser() userInfo:string): Promise<void> {   
    return await this.updateUserUseCase.execute(data, userInfo, id);
  }

}