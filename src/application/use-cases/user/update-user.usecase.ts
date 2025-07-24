import { Inject, Injectable } from "@nestjs/common";
import { UpdatePartialDto } from "src/application/dtos/user/update-partial.dto";
import { UserEntity } from "src/domain/entities/user.entity";
import { IUserRepository } from "src/domain/repositories/iuser.repository";
import { UserRepository } from "src/infra/repositories/sequelize/user.repository";



@Injectable()
export class UpdateUserUseCase {
  constructor(
    @Inject('IUserRepository')
    private readonly IuserRepository: IUserRepository,
  ) {}

   async execute(input: any): Promise<void> {
    const user = await this.IuserRepository.findByEmail(input.email);

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
    await this.IuserRepository.update(updatedUser);
  }
}
