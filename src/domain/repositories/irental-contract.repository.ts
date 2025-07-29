import { RentalContractModel } from 'src/infra/database/models/rental-contract.model';
import { RentalContractEntity } from '../entities/rental-contract.entity';

export interface IRentalContractRepository {
  create(contract: RentalContractEntity): Promise<RentalContractModel | null>;
  findById(id: string): Promise<RentalContractModel | null>;
  findStatusByPropertyId(propertyId: string, data): Promise<RentalContractModel | null>
  updateContractStatus(propertyId: string, status: string)
  findByPropertyId(propertyId: string): Promise<RentalContractEntity | null>;
  findByTenantId(tenantId: string): Promise<RentalContractEntity[] | null>;
  update(contract: RentalContractEntity): Promise<RentalContractEntity | null>;
  delete(id: string): Promise<RentalContractEntity | null>;
}
