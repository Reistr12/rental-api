import { UserEntity } from '../entities/user.entity';
import { User } from 'src/infra/database/models/user.model';

export interface IUserRepository {
  create(user: UserEntity): Promise<User>;
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  findByEmailWithPassword(email: string): Promise<any | null>;
  update(user: UserEntity, id: string): Promise<void>;
  updatePartial(data: Partial<UserEntity>, id: string): Promise<User | null>;
  delete(id: string): Promise<void>;
}
    