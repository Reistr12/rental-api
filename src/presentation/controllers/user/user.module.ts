import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CreateUserController } from './create-user.controller';
import { CreateUserUseCase } from 'src/application/use-cases/user/create-user.use-case';
import { ShowUserByIdController } from './show-user-by-id.controller';
import { ShowUserByIdUseCase } from 'src/application/use-cases/user/show-user-by-id.usecase';
import { UserRepository } from 'src/infra/repositories/sequelize/user.repository';
import { User } from 'src/infra/database/models/user.model';
import { ShowUserByEmailController } from './show-user-by-email.controller';
import { ShowUserByEmailUseCase } from 'src/application/use-cases/user/show-user-by-email.usecase';

@Module({
  imports: [SequelizeModule.forFeature([User])],
  controllers: [CreateUserController, ShowUserByIdController, ShowUserByEmailController],
  providers: [
    CreateUserUseCase, ShowUserByIdUseCase, ShowUserByEmailUseCase,
    {
      provide: 'IUserRepository',
      useClass: UserRepository, // Use Sequelize UserRepository
    },
  ],
})
export class UserModule {}
