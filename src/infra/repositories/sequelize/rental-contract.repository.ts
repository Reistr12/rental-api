import { Inject, Injectable } from "@nestjs/common";
import { RentalContract } from "src/domain/entities/rental-contract.entity";
import { IRentalContractRepository } from "src/domain/repositories/irental-contract.repository";
import { RentalContractModel } from "src/infra/database/models/rental-contract.model";

@Injectable ()
export class RentalContractRepository implements IRentalContractRepository{

    constructor(@Inject(RentalContractModel) private readonly RentalContractModel: RentalContractModel){}
      async create(contract: RentalContract): Promise<RentalContract | null>{
        return null
      }
      async findById(id: string): Promise<RentalContract | null>{
        return null
      }
      async findByPropertyId(propertyId: string): Promise<RentalContract | null>{
        return null
      }
      async findByTenantId(tenantId: string): Promise<RentalContract[] | null>{
        return null
      }
      async update(contract: RentalContract): Promise<RentalContract | null>{
        return null
      };
      async delete(id: string): Promise<RentalContract | null>{
        return null
      }
}