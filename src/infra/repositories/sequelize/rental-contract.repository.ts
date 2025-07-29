import { HttpException, Inject, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { contains } from "class-validator";
import { Op, where } from "sequelize";
import { RentalContractEntity } from "src/domain/entities/rental-contract.entity";
import { IRentalContractRepository } from "src/domain/repositories/irental-contract.repository";
import { RentalContractModel } from "src/infra/database/models/rental-contract.model";

@Injectable ()
export class RentalContractRepository implements IRentalContractRepository{
     constructor(
      @InjectModel(RentalContractModel)
      private readonly rentalContractModel: typeof RentalContractModel
    ) {}
   
      async create(contract: RentalContractEntity): Promise<RentalContractModel | null>{
        const created = await this.rentalContractModel.create(contract as any)
        if(created) {
          return created
        } else {
          return null
        }
      }

      async findStatusByPropertyId(propertyId: string, data): Promise<RentalContractModel | null>{
        console.log('=========================================================')
        console.log(propertyId)
        console.log('=========================================================')
        const contract = await this.rentalContractModel.findOne({
          where: {
            propertyId,
            status: 'APPROVED',
            startDate: { [Op.lte]: new Date(data.endDate) },
            endDate: { [Op.gte]: new Date(data.startDate) }
          }
        })
        console.log('=========================================================')
        console.log(contract)
        console.log('=========================================================')
        if(contract === null) return null
        return contract
      }

      async updateContractStatus(contractId: string, status: 'APPROVED' | 'REJECTED'): Promise<any> {
        const upadtedContract = await this.rentalContractModel.update(
          { status }, // dados para atualizar
          {
            where: { id: contractId } // cláusula de filtragem
          }
        );

        if(upadtedContract === null) return null
        return upadtedContract
      }

      async findById(id: string): Promise<RentalContractModel | null>{
        const contract = await this.rentalContractModel.findOne({where: {id}})
        if(contract === null) return null
        return contract
        
      }
      async findByPropertyId(propertyId: string): Promise<RentalContractEntity | null>{
        
        return null
      }
      async findByTenantId(tenantId: string): Promise<RentalContractEntity[] | null>{
        return null
      }
      async update(contract: RentalContractEntity): Promise<RentalContractEntity | null>{
        return null
      };
      async delete(id: string): Promise<RentalContractEntity | null>{
        return null
      }
}