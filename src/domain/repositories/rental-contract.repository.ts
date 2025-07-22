import { RentalContract } from '../entities/rental-contract.entity';

export interface RentalContractRepository {
  create(contract: RentalContract): Promise<void>;
  findById(id: string): Promise<RentalContract | null>;
  findByPropertyId(propertyId: string): Promise<RentalContract | null>;
  findByTenantId(tenantId: string): Promise<RentalContract[]>;
  update(contract: RentalContract): Promise<void>;
  delete(id: string): Promise<void>;
}
