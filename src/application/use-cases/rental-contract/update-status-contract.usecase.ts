import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { IPropertyRepository } from "src/domain/repositories/ipropety.repository";
import { IRentalContractRepository } from "src/domain/repositories/irental-contract.repository";

@Injectable()
export class updateContractStatusUseCase{
 constructor(
        @Inject('IRentalContractRepository') private readonly RentalContractRepository: IRentalContractRepository,
        @Inject('IPropertyRepository') private readonly PropertyRepository: IPropertyRepository
    ){}
    async execute(userInfo, contractId: string, status: 'APPROVED' | 'REJECTED'){
        const contract = await this.RentalContractRepository.findById(contractId)
        if(contract === null ){
            throw new HttpException('This contract not exists', HttpStatus.BAD_REQUEST)
        }
        const property = await this.PropertyRepository.findById(contract.propertyId)

        if(property === null ){
            throw new HttpException('This property not exists', HttpStatus.BAD_REQUEST)
        } else if (property.ownerId !== userInfo.sub){
            throw new HttpException('You not have permission', HttpStatus.UNAUTHORIZED)
        }

        const updated = await this.RentalContractRepository.updateContractStatus(contractId, status)

        if (updated === null){
            throw new HttpException('Bad request', HttpStatus.BAD_REQUEST)
        } else {
            return {'messafe':'Congratulations this you rented this property'}
        }
    }
}