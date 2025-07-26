import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from '@nestjs/sequelize';
import { error } from "console";
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
    if (!user) throw new HttpException('User not found.', HttpStatus.NOT_FOUND);
    const { password, ...userWithoutPassword } = user.get({ plain: true });
    return userWithoutPassword;
}   

  async findByEmail(email: string): Promise<any | null> {
   const user = await this.userModel.findOne({ where: { email } });
   if (!user) return null;

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


  async update(user: UserEntity): Promise<any> {
    const existingUser = await this.userModel.findByPk(user.id);
    if (existingUser) {
      await existingUser.update({
        name: user.name,
        email: user.email,
        password: user.password,
        role: user.role,
      });
    } else {
      throw new HttpException('User not found.', HttpStatus.NOT_FOUND);
    }
    return new UserEntity(
      user.id,
      user.name,
      user.email,
      user.password,
      user.role,
      user.createdAt ?? new Date(),
    )
  }

  async updatePartial(data: Partial<UserEntity>): Promise<any> {
    const user = await this.userModel.findByPk(data.id);

    if (!user) {
      throw new HttpException('User not found.', HttpStatus.NOT_FOUND);
    }

    await user.update(data);

    //Linhas adicionadas para retornar o atualizar o user depois da mudança
    //Isso é opcional, dependendo de como você deseja manipular o retorno
    const updatedUser = await this.userModel.findByPk(data.id);
    if (!updatedUser) {
      throw new HttpException('Error.', HttpStatus.INTERNAL_SERVER_ERROR);
    }
    const plainUser = updatedUser.get({ plain: true });

    return {
      id: plainUser.id,
      name: plainUser.name,
      email: plainUser.email,
      role: plainUser.role,
      createdAt: plainUser.createdAt,
    };
  }

  async delete(email: string): Promise<any> {
    const deleted = await User.destroy({ where: { email } });
    if (deleted === 0) { 
       throw new HttpException('User not found.', HttpStatus.NOT_FOUND);
    }
    return { message: 'User deleted successfully' };
  }
}