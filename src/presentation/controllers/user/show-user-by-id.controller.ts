import { Controller, Get, HttpException, HttpStatus, Param, Post, UseGuards } from "@nestjs/common";
import { ShowUserByIdUseCase } from "src/application/use-cases/user/show-user-by-id.usecase";
import { AuthGuard } from "src/auth/auth.guard";
import { UserEntity } from "src/domain/entities/user.entity";

@Controller('Users')
export class ShowUserByIdController {
  constructor(private readonly showUserByIdUseCase: ShowUserByIdUseCase) {}

  @UseGuards(AuthGuard)
  @Get(':id')
  async showUserById(@Param('id') id: string): Promise<UserEntity> {
      const user = await this.showUserByIdUseCase.execute(id);
      return user
  }
}