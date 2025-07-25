import { Controller, Post, Body, HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { CreateUserDto } from 'src/application/dtos/user/create-user.dto';
import { CreateUserUseCase } from 'src/application/use-cases/user/create-user.use-case';
import { AuthGuard } from 'src/auth/auth.guard';
import { UserEntity } from 'src/domain/entities/user.entity';

@Controller('users')
export class CreateUserController {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  @UseGuards(AuthGuard)
  @Post('create')
  async createUser(@Body() data: CreateUserDto): Promise<UserEntity> {
    try {
      const user = await this.createUserUseCase.execute(data);
      return user;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
