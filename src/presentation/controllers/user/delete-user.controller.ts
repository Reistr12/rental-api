import { Body, Controller, Delete } from "@nestjs/common";
import { DeleteUserUseCase } from "src/application/use-cases/user/delete-user.usecase";

@Controller('users')
export class DeleteUserController {
  constructor(
    private readonly deleteUserUseCase: DeleteUserUseCase,
  ) {}
  
  @Delete()
    async delete(@Body('email') email: string): Promise<any> {
    return this.deleteUserUseCase.execute(email);
  }

}