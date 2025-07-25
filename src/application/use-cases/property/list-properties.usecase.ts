import { Inject, Injectable } from "@nestjs/common";
import { updatePropertyDto } from "src/application/dtos/property/update-property.dto";
import { PropertyEntity } from "src/domain/entities/property.entity";
import { IPropertyRepository } from "src/domain/repositories/ipropety.repository";


@Injectable()
export class ListPropertiesUseCase {
  constructor(
    @Inject('IPropertyRepository')
    private readonly IPropertyRepository: IPropertyRepository
  ) {}
  async execute() {
    const properties = await this.IPropertyRepository.findAll();
    return properties;
  }
}