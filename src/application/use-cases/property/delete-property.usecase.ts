import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { promises } from "dns";
import { IPropertyRepository } from "src/domain/repositories/ipropety.repository";

@Injectable()
export class DeletePropertyUseCase {
  constructor(@Inject('IPropertyRepository') private readonly PropetyRepository: IPropertyRepository) { }
    
  async execute(ownerId: string, propertyId: string): Promise<void> {
    const property = await this.PropetyRepository.findById(propertyId);
  
    if (!property) {
      throw new HttpException('Property not found', HttpStatus.NOT_FOUND)
    }  

    if (property.ownerId !== ownerId) {
      throw new HttpException('You not have permission to delete this property.', HttpStatus.UNAUTHORIZED);
    }

    return await this.PropetyRepository.delete(propertyId);
  }

}