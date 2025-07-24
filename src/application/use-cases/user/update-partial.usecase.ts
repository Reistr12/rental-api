import { Inject, Injectable } from "@nestjs/common";
import { UpdatePartialDto } from "src/application/dtos/user/update-partial.dto";
import { UserEntity } from "src/domain/entities/user.entity";
import { UserRepository } from "src/infra/repositories/sequelize/user.repository";

@Injectable()
export class UpdatePartialUserUseCase {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: UserRepository,
  ) {}

  async execute(input: any): Promise<any> {
    const user = await this.userRepository.findByEmail(input.email);

    if (!user) {
      throw new Error('Usuário não encontrado.');
    }

    const updatedUser = new UserEntity(
      user.id,
      input.name ?? user.name,
      input.email ?? user.email,
      input.password ?? user.password,
      input.role ?? user.role
    );
    
    return await this.userRepository.updatePartial(updatedUser);
  }
}   