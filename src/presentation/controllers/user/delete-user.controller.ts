import { Body, Controller, Delete, UseGuards } from "@nestjs/common";
import { DeleteUserUseCase } from "src/application/use-cases/user/delete-user.usecase";
import { AuthGuard } from "src/auth/auth.guard";

@Controller('users')
export class DeleteUserController {
  constructor(
    private readonly deleteUserUseCase: DeleteUserUseCase,
  ) {}
  
  @UseGuards(AuthGuard)
  @Delete()
    async delete(@Body('email') email: string): Promise<any> {
    return this.deleteUserUseCase.execute(email);
  }

}