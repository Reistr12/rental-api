import { UserEntity } from '../entities/user.entity';
import { User } from 'src/infra/database/models/user.model';

export interface IUserRepository {
  create(user: UserEntity): Promise<User>;
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  update(user: UserEntity): Promise<void>;
  updatePartial(data: Partial<UserEntity>): Promise<User | null>;
  delete(id: string): Promise<void>;
}
    