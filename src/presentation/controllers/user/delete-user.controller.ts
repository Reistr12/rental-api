import { Body, Controller, Delete, UseGuards } from "@nestjs/common";
import { userInfo } from "os";
import { DeleteUserUseCase } from "src/application/use-cases/user/delete-user.usecase";
import { AuthGuard } from "src/auth/auth.guard";
import { CurrentUser } from "src/common/decorators/current-user.decorator";

@Controller('users')
export class DeleteUserController {
  constructor(
    private readonly deleteUserUseCase: DeleteUserUseCase,
  ) {}
  
  @UseGuards(AuthGuard)
  @Delete()
    async delete(@Body('email') email: string, @CurrentUser() userInfo): Promise<any> {
    return this.deleteUserUseCase.execute(email ,userInfo);
  }

}