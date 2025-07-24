import { Inject, Injectable } from "@nestjs/common";
import { PropertyEntity } from "src/domain/entities/property.entity";
import { IPropertyRepository } from "src/domain/repositories/ipropety.repository";

@Injectable()
export class CreatePropertyUseCase {
    constructor(@Inject('IPropertyRepository') private readonly propertyRepository: IPropertyRepository) {}

    async execute(data): Promise<any> {
        const property = new PropertyEntity(
            data.id,
            data.title,
            data.description,
            data.address,
            data.price,
            data.ownerId,
            new Date()
        );
        return await this.propertyRepository.create(property);
    }
}