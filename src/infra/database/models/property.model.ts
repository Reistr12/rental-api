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
  title: string;

  @Column(DataType.TEXT)
  description: string;

  @Column
  address: string;

  @Column(DataType.FLOAT)
  price: number;

  @Column({ type: DataType.UUID })
  ownerId: string;

  @CreatedAt
  @Column
  declare createdAt: Date;

  @UpdatedAt
  @Column
  declare updatedAt: Date;
}
