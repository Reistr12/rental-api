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

  async execute(input: any, userInfo: any, id): Promise<any> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new Error('User Not Found');
    }
    
    if(user.id !== userInfo.sub){
      throw new Error('You not authorization for update this user');
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