import { RentalContract } from '../entities/rental-contract.entity';

export interface IRentalContractRepository {
  create(contract: RentalContract): Promise<RentalContract | null>;
  findById(id: string): Promise<RentalContract | null>;
  findByPropertyId(propertyId: string): Promise<RentalContract | null>;
  findByTenantId(tenantId: string): Promise<RentalContract[] | null>;
  update(contract: RentalContract): Promise<RentalContract | null>;
  delete(id: string): Promise<RentalContract | null>;
}
