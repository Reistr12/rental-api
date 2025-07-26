import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { IUserRepository } from "src/domain/repositories/iuser.repository";

@Injectable()
export class DeleteUserUseCase {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,) {}

    async execute(email: string, userInfo: any): Promise<any> {
     const userAlreadyExists = await this.userRepository.findByEmail(email);

     if (!userAlreadyExists) {
       throw new HttpException('Not exists user with this email', HttpStatus.NOT_FOUND)
     }

      if(userAlreadyExists.id == userInfo.sub){
        return await this.userRepository.delete(email);
      } else {
      throw new HttpException('You not have authorization for delete this user', HttpStatus.UNAUTHORIZED)
      }      
  }
}   