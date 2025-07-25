import { Inject, Injectable } from "@nestjs/common";
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
        return {'message': 'Property not found', status: 404, data: null}
    }


    const propertyEntity = new PropertyEntity(
      id,
      data.title,
      data.description,
      data.address,
      data.price,
      ownerId,
    )

    return await this.propertyRepository.update(propertyEntity)
  }
}