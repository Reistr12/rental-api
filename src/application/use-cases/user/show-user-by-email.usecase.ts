import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { UserEntity } from "src/domain/entities/user.entity";
import { IUserRepository } from "src/domain/repositories/iuser.repository";

@Injectable()
export class ShowUserByEmailUseCase {   
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(email: string): Promise<UserEntity> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND)
    }

    return new UserEntity(
      user.id,
      user.name,
      user.email,
      user.password,
      user.role as any, 
      user.createdAt,
    );
  }
}   