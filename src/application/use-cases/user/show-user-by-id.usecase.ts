import { Inject, Injectable } from "@nestjs/common";
import { UserRepository } from "src/domain/repositories/user.repository";

@Injectable()
export class ShowUserByIdUseCase {
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: UserRepository,
  ) {}

  async execute(userId: string): Promise<any> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new Error('Usuário não encontrado.');
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
    };
  }
}