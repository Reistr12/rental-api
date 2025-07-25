import {
  Table,
  Column,
  Model,
  PrimaryKey,
  DataType,
  CreatedAt,
  UpdatedAt,
} from 'sequelize-typescript';

@Table({ tableName: 'properties' })
export class PropertyModel extends Model<PropertyModel> {
  @PrimaryKey
  @Column({ type: DataType.UUID })
  declare id: string;

  @Column
  declare title: string;

  @Column(DataType.TEXT)
  declare description: string;

  @Column
  declare address: string;

  @Column(DataType.FLOAT)
  declare price: number;

  @Column({ type: DataType.UUID })
  declare ownerId: string;

  @CreatedAt
  @Column
  declare createdAt: Date;

  @UpdatedAt
  @Column
  declare updatedAt: Date;
}
