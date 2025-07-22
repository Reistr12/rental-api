import { Module } from '@nestjs/common';
import { CreateUserController } from './create-user.controller';
import { CreateUserUseCase } from 'src/application/use-cases/user/create-user.use-case';
import { UserRepository } from 'src/domain/repositories/user.repository';
import { InMemoryUserRepository } from 'src/domain/repositories/in-memory-user.repository';
import { ShowUserByIdController } from './show-user-by-id.controller';
import { ShowUserByIdUseCase } from 'src/application/use-cases/user/show-user-by-id.usecase';

@Module({
  controllers: [CreateUserController, ShowUserByIdController],
  providers: [
    CreateUserUseCase, ShowUserByIdUseCase,
    {
      provide: 'UserRepository',
      useClass: InMemoryUserRepository, // por enquanto uma simulação (vamos criar agora)
    },
  ],
})
export class UserModule {}
