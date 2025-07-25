import { Body, Controller, Put, UseGuards } from "@nestjs/common";
import { updateUserDto } from "src/application/dtos/user/update-user.dto";
import { UpdateUserUseCase } from "src/application/use-cases/user/update-user.usecase";
import { AuthGuard } from "src/auth/auth.guard";

@Controller('users')
export class UpdateUserController {
  constructor(private readonly updateUserUseCase: UpdateUserUseCase) {}

  @UseGuards(AuthGuard)
  @Put('update')
  async updateUser(@Body() data: updateUserDto): Promise<void> {   
    return await this.updateUserUseCase.execute(data);
  }

}