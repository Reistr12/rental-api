// auth.service.ts
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/infra/database/models/user.model';
import { IUserRepository } from 'src/domain/repositories/iuser.repository';
import { UserRepository } from 'src/infra/repositories/sequelize/user.repository';

@Injectable()
export class AuthService {
   constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<User> {
  const user = await this.userRepository.findByEmailWithPassword(email);
  if (!user) throw new UnauthorizedException('Email ou senha inválidos');

  const passwordValid = await bcrypt.compare(password, user.password);
  if (!passwordValid) throw new UnauthorizedException('Email ou senha inválidos');

  return user;
}


  async login(user: User) {
    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role, // se você tiver isso
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
