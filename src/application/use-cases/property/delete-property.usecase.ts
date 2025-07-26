import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { promises } from "dns";
import { IPropertyRepository } from "src/domain/repositories/ipropety.repository";

@Injectable()
export class DeletePropertyUseCase {
  constructor(@Inject('IPropertyRepository') private readonly PropetyRepository: IPropertyRepository) { }
    
  async execute(ownerId: string, propertyId: string): Promise<void> {
    const property = await this.PropetyRepository.findById(propertyId);
  
    if (property === null) {
      throw new HttpException('Property not found', HttpStatus.NOT_FOUND)
    }  

    if (property.ownerId !== ownerId) {
      throw new HttpException('You not have permission for delete this property.', HttpStatus.UNAUTHORIZED);
    }

    const deleted = await this.PropetyRepository.delete(propertyId);
    if(deleted === null) {
      throw new HttpException('Property not found', HttpStatus.NOT_FOUND)
    }
  }

}