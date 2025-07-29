import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
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

  async findById(id: string): Promise<any | any> {
    const user = await this.userModel.findOne({ where: { id } });
    if (!user) return null
    const { password, ...userWithoutPassword } = user.get({ plain: true });
    return userWithoutPassword;
}   

  async findByEmail(email: string): Promise<any | null> {
    const user = await this.userModel.findOne({ where: { email } });
    if(!user) return null
    const { password, ...userWithoutPassword } = user.get({ plain: true });
    return userWithoutPassword; 
  }

  // Método para encontrar usuário por email, incluindo a senha
  // Isso é útil para autenticação, mas deve ser usado com cuidado
  // pois expõe a senha do usuário.
  async findByEmailWithPassword(email: string): Promise<any | null> {
    const user = await this.userModel.findOne({ where: { email } });
    if (!user) return null;
    // retorna com a senha (não remove)
    return user.get({ plain: true });
  }


  async update(user: UserEntity, id: string): Promise<any> {
    const existingUser = await this.userModel.findByPk(id);
    if (existingUser) {
      await existingUser.update({
        name: user.name,
        email: user.email,
        password: user.password,
        role: user.role,
      });
      return existingUser;
    } else {
      return null
    }
    
  }

  async updatePartial(data: Partial<UserEntity>, id: string): Promise<any> {
    const user = await this.userModel.findByPk(id);

    if (!user) return null

    await user.update(data);

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
    };
  }

  async delete(email: string): Promise<any> {
    const deleted = await User.destroy({ where: { email } });
    if (deleted === 0) return null
    return { message: 'User deleted successfully' };
  }
}