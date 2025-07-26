import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { UserEntity } from "src/domain/entities/user.entity";
import { IUserRepository } from "src/domain/repositories/iuser.repository";



@Injectable()
export class UpdateUserUseCase {
  constructor(
    @Inject('IUserRepository')
    private readonly IuserRepository: IUserRepository,
  ) {}

   async execute(input, userInfo, id: string): Promise<void> {
    const { name, email, password, role } = input;
    const user = await this.IuserRepository.findById(userInfo.sub);

    if (user === null) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND)
    }

    if(userInfo.sub !== id){
      throw new HttpException('You not authorization for update this user', HttpStatus.UNAUTHORIZED)
    }

   const userAlreadyExists = await this.IuserRepository.findByEmail(email);

    if (userAlreadyExists !== null) {
      throw new HttpException('this email is unavailable.', HttpStatus.BAD_REQUEST);
    }
    const updatedUser = new UserEntity(
      user.id,
      name ?? user.name,
      email ?? user.email,
      password ?? user.password,
      role ?? user.role
    );
    return await this.IuserRepository.update(updatedUser, id);
  }
}
