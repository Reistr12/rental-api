import { Injectable } from "@nestjs/common";
import { InjectModel } from '@nestjs/sequelize';
import { UserEntity } from "src/domain/entities/user.entity";
import { IUserRepository } from "src/domain/repositories/iuser.repository";
import { User } from 'src/infra/database/models/user.model';


@Injectable()
export class UserRepository implements IUserRepository{
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
  ) {}
    
  async create(user: UserEntity): Promise<User> {
    const created = await this.userModel.create(user as any);
    return created;
  }

  async findById(id: string): Promise<any | null> {
    const user = await this.userModel.findOne({ where: { id } });
    if (!user) return null;
    const { password, ...userWithoutPassword } = user.get({ plain: true });
    return userWithoutPassword;
}   

  async findByEmail(email: string): Promise<any | null> {
   const user = await this.userModel.findOne({ where: { email } });
   if (!user) return null;

  const { password, ...userWithoutPassword } = user.get({ plain: true });
  return userWithoutPassword; 
  }

  async update(user: User): Promise<void> {
    const existingUser = await this.userModel.findByPk(user.id);
    if (existingUser) {
      await existingUser.update(user);
    } else {
      throw new Error('User not found');
    }
  }

  async delete(id: string): Promise<void> {
    const user = await this.userModel.findByPk(id);
    if (user) {
      await user.destroy();
    } else {
      throw new Error('User not found');
    }
  }
}