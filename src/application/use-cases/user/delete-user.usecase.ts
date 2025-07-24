import { Inject, Injectable } from "@nestjs/common";
import { IUserRepository } from "src/domain/repositories/iuser.repository";

@Injectable()
export class DeleteUserUseCase {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,) {}

    async execute(email): Promise<any> {
     const userAlreadyExists = await this.userRepository.findByEmail(email);
     if (!userAlreadyExists) {
       throw new Error('Não existe um usuário com esse email.');
     }
      return await this.userRepository.delete(email);
      
    }
}   