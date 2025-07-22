import { Controller, Get, HttpException, HttpStatus, Param, Post } from "@nestjs/common";
import { ShowUserByIdUseCase } from "src/application/use-cases/user/show-user-by-id.usecase";

@Controller('Users')
export class ShowUserByIdController {
  constructor(private readonly showUserByIdUseCase: ShowUserByIdUseCase) {}

  @Get(':id')
  async showUserById(@Param('id') id: string): Promise<any> {
    try {
      const user = await this.showUserByIdUseCase.execute(id);
      return user;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }
}