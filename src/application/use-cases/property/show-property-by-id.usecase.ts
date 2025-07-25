import { Inject, Injectable } from "@nestjs/common";
import { IPropertyRepository } from "src/domain/repositories/ipropety.repository";

@Injectable()
export class ShowPropertyByIdUseCase {
    constructor(
        @Inject('IPropertyRepository') private readonly propertyRepository: IPropertyRepository
    ) {}

    async execute(id: string): Promise<any> {
        const property = await this.propertyRepository.findById(id);
        if (!property) {
            throw new Error('Property not found');
        }
        return property;
    }
}