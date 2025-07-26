import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { error } from "node:console";
import { randomUUID } from "node:crypto";
import { updatePropertyDto } from "src/application/dtos/property/update-property.dto";
import { PropertyEntity } from "src/domain/entities/property.entity";
import { IPropertyRepository } from "src/domain/repositories/ipropety.repository";

@Injectable()
export class UpdatePropertyUseCase {
  constructor(
    @Inject('IPropertyRepository')
    private readonly propertyRepository: IPropertyRepository
  ) {}
  async execute(data: updatePropertyDto, ownerId: string, id: string) {
    if(data.title == undefined || !data.description || !data.price || !data.address) {
        throw new HttpException('data is mandatory.', HttpStatus.BAD_REQUEST);
    }

    const propertyOwnerId = await this.propertyRepository.findById(id)
    if (propertyOwnerId === null) {
       throw new HttpException('NOT Found', HttpStatus.NOT_FOUND)
    }
    
    if(ownerId !== propertyOwnerId?.ownerId){
      throw new HttpException('You not authorization for update this property', HttpStatus.UNAUTHORIZED)
    }

    const propertyEntity = new PropertyEntity(
      id,
      data.title,
      data.description,
      data.address,
      data.price,
      ownerId,
    )

    const update = this.propertyRepository.update(propertyEntity, id)
    if(update === null)  throw new HttpException('Property not found', HttpStatus.NOT_FOUND)
      return update;
  }
}