import {
  Table,
  Column,
  Model,
  PrimaryKey,
  DataType,
  CreatedAt,
} from 'sequelize-typescript';

@Table({ tableName: 'rental_contracts' })
export class RentalContractModel extends Model<RentalContractModel> {
  @PrimaryKey
  @Column({ type: DataType.UUID })
  declare id: string;

  @Column({ type: DataType.UUID, allowNull: false })
  propertyId: string;

  @Column({ type: DataType.UUID, allowNull: false })
  tenantId: string;

  @Column({ type: DataType.DATE, allowNull: false })
  startDate: Date;

  @Column({ type: DataType.DATE, allowNull: false })
  endDate: Date;

  @Column({ type: DataType.FLOAT, allowNull: false })
  monthlyValue: number;

  @Column({ type: DataType.BOOLEAN, defaultValue: true })
  isActive: boolean;

  @CreatedAt
  @Column
  declare createdAt: Date;
}
