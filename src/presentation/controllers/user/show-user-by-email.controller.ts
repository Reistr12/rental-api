import { Body, Controller, Get, HttpException, HttpStatus, Param, Post } from "@nestjs/common";
import { CreateUserDto } from "src/application/dtos/user/create-user.dto";
import { ShowUserByEmailUseCase } from "src/application/use-cases/user/show-user-by-email.usecase";
import { UserEntity } from "src/domain/entities/user.entity";

@Controller('Users')
export class ShowUserByEmailController {
  constructor(private readonly showUserByEmailUseCase: ShowUserByEmailUseCase) {}

  @Post("email")
  async showUserByEmail(@Body() Body: {email: string}): Promise<UserEntity> {
    try {
      const user = await this.showUserByEmailUseCase.execute(Body.email);
      return user;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }
}