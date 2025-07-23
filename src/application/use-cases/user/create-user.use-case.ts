import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from 'src/domain/repositories/iuser.repository';
import { UserEntity } from 'src/domain/entities/user.entity';
import { CreateUserDto } from 'src/application/dtos/user/create-user.dto';
import { randomUUID } from 'crypto';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(input: CreateUserDto): Promise<any> {
    const { name, email, password, role } = input;

    const userAlreadyExists = await this.userRepository.findByEmail(email);
    if (userAlreadyExists) {
      throw new Error('Já existe um usuário com esse email.');
    }

    const user = new UserEntity(randomUUID(), name, email, password, role);

    await this.userRepository.create(user);

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
    };
  }
}
