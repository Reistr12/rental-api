import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { randomUUID } from "crypto";
import { PropertyEntity } from "src/domain/entities/property.entity";
import { IPropertyRepository } from "src/domain/repositories/ipropety.repository";

@Injectable()
export class CreatePropertyUseCase {
    constructor(@Inject('IPropertyRepository') private readonly propertyRepository: IPropertyRepository) {}

    async execute(data, userInfo): Promise<any> {
        if (userInfo.role !== 'LOCADOR') {
            throw new HttpException('You not have authorization for create a property.', HttpStatus.UNAUTHORIZED);
        }
        console.log(userInfo)
        const property = new PropertyEntity(
            randomUUID(),
            data.title,
            data.description,
            data.address,
            data.price,
            userInfo.sub,
            new Date()
        );
        return await this.propertyRepository.create(property);
    }
}