import { Body, Controller, Put } from "@nestjs/common";
import { updateUserDto } from "src/application/dtos/user/update-user.dto";
import { UpdateUserUseCase } from "src/application/use-cases/user/update-user.usecase";

@Controller('users')
export class UpdateUserController {
  constructor(private readonly updateUserUseCase: UpdateUserUseCase) {}

  @Put('update')
  async updateUser(@Body() data: updateUserDto): Promise<void> {   
    return await this.updateUserUseCase.execute(data);
  }

}