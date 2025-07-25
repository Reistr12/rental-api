import { Inject, Injectable } from "@nestjs/common";
import { IUserRepository } from "src/domain/repositories/iuser.repository";

@Injectable()
export class DeleteUserUseCase {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,) {}

    async execute(email: string, userInfo: any): Promise<any> {
     const userAlreadyExists = await this.userRepository.findByEmail(email);

     if (!userAlreadyExists) {
       throw new Error('Não existe um usuário com esse email.');
     }

      if(userAlreadyExists.id == userInfo.sub){
        return await this.userRepository.delete(email);
      } else {
       throw new Error('You do not have permission to delete this user')
      }      
  }
}   