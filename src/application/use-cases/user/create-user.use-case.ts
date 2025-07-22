import { User } from '../../../domain/entities/user.entity';
import { UserRepository } from '../../../domain/repositories/user.repository';
import { CreateUserDto } from 'src/application/dtos/user/create-user.dto';
import { randomUUID } from 'crypto';

export class CreateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(input: CreateUserDto): Promise<any> {
    const { name, email, password, role } = input;

    const userAlreadyExists = await this.userRepository.findByEmail(email);
    if (userAlreadyExists) {
      throw new Error('Já existe um usuário com esse email.');
    }

    const user = new User(
      randomUUID(),
      name,
      email,
      password, // futuramente hash aqui
      role
    );

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
