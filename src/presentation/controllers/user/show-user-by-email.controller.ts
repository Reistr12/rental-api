import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, UseGuards } from "@nestjs/common";
import { ShowUserByEmailUseCase } from "src/application/use-cases/user/show-user-by-email.usecase";
import { AuthGuard } from "src/auth/auth.guard";
import { UserEntity } from "src/domain/entities/user.entity";

@Controller('Users')
export class ShowUserByEmailController {
  constructor(private readonly showUserByEmailUseCase: ShowUserByEmailUseCase) {}

  @UseGuards(AuthGuard)
  @Post("email")
  async showUserByEmail(@Body() Body: {email: string}): Promise<UserEntity> {
      const user = await this.showUserByEmailUseCase.execute(Body.email);
      return user;
  }
}