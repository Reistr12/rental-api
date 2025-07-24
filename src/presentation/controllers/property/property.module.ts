import { Module } from "@nestjs/common";
import { CreatePropertyUseCase } from "src/application/use-cases/property/create-property.usecase";
import { PropertyRepository } from "src/infra/repositories/sequelize/property.repository";
import { CreatePropertyController } from "./create-property.controller";

@Module({
    controllers: [CreatePropertyController],
    providers: [CreatePropertyUseCase,{
        provide: 'IPropertyRepository',
        useClass: PropertyRepository, // Use Sequelize PropertyRepository
    }],
    exports: []
})
export class PropertyModule {}