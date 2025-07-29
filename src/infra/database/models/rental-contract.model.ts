import {
  Table,
  Column,
  Model,
  PrimaryKey,
  DataType,
  CreatedAt,
  UpdatedAt,
} from 'sequelize-typescript';

@Table({ tableName: 'rental_contracts', timestamps: true })
export class RentalContractModel extends Model<RentalContractModel> {
  @PrimaryKey
  @Column({ type: DataType.UUID })
  declare id: string;

  @Column({ type: DataType.UUID, allowNull: false, field: 'property_id' })
  declare propertyId: string;

  @Column({ type: DataType.UUID, allowNull: false, field: 'tenant_id' })
  declare tenantId: string;

  @Column({ type: DataType.DATE, allowNull: false, field: 'start_date' })
  declare startDate: Date;

  @Column({ type: DataType.DATE, allowNull: false, field: 'end_date' })
  declare endDate: Date;

  @Column({ type: DataType.FLOAT, allowNull: false, field: 'monthly_value' })
  declare monthlyValue: number;

  @Column({ type: DataType.BOOLEAN, defaultValue: true, field: 'is_active' })
  declare isActive: boolean;

  @Column({
    type: DataType.ENUM('PENDING', 'APPROVED', 'REJECTED'),
    defaultValue: 'PENDING',
  })
  declare status: 'PENDING' | 'APPROVED' | 'REJECTED';

  @CreatedAt
  @Column({ field: 'created_at', type: DataType.DATE })
  declare createdAt: Date;

  @UpdatedAt
  @Column({ field: 'updated_at', type: DataType.DATE })
  declare updatedAt: Date;
}
