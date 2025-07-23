import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({ tableName: 'users' })
export class User extends Model<User> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  declare id: string;

  @Column({ allowNull: false })
  name: string;

  @Column({ allowNull: false, unique: true })
  email: string;

  @Column({ allowNull: false })
  password: string;

  @Column({ allowNull: false })
  role: string;

  @Column({ type: DataType.DATE, defaultValue: DataType.NOW })
  declare createdAt: Date;
}
