import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { randomUUID } from "crypto";
import { RentalContractEntity } from "src/domain/entities/rental-contract.entity";
import { IPropertyRepository } from "src/domain/repositories/ipropety.repository";
import { IRentalContractRepository } from "src/domain/repositories/irental-contract.repository";

@Injectable()
export class CreateContractUseCase{
    constructor(
        @Inject('IRentalContractRepository') private readonly RentalContractRepository: IRentalContractRepository,
        @Inject('IPropertyRepository') private readonly PropertyRepository: IPropertyRepository
    ){}
    async execute(userInfo, data, propertyId): Promise<RentalContractEntity | any>{

        const propertyStatus = await this.RentalContractRepository.findStatusByPropertyId(propertyId, data)

        if(propertyStatus === null) {
            throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST)
        } else if(propertyStatus.status === 'APPROVED'){
            throw new HttpException('This property have a contract active on that date', HttpStatus.CONFLICT)
        }

        const tenantId = userInfo.sub;
        const property = await this.PropertyRepository.findById(propertyId)
        
        if(!property){
            throw new HttpException('Property not found', HttpStatus.NOT_FOUND)
        }
        
        const RentalContract = new RentalContractEntity(
            randomUUID(),
            propertyId,
            tenantId,
            data.startDate,
            data.endDate,
            property.price,
            true,
            'PENDING',
            new Date()
        )
        const contract = await this.RentalContractRepository.create(RentalContract)

        if(contract === null){
            throw new HttpException('error creating contract', HttpStatus.BAD_REQUEST)
        }
        return contract
    }
}