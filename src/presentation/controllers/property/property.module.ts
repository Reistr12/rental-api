import { Module } from "@nestjs/common";
import { CreatePropertyUseCase } from "src/application/use-cases/property/create-property.usecase";
import { PropertyRepository } from "src/infra/repositories/sequelize/property.repository";
import { CreatePropertyController } from "./create-property.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { PropertyModel } from "src/infra/database/models/property.model";
import { ShowPropertyByIdController } from "./show-property-by-id.controller";
import { ShowPropertyByIdUseCase } from "src/application/use-cases/property/show-property-by-id.usecase";

@Module({
    imports: [SequelizeModule.forFeature([PropertyModel])],
    controllers: [CreatePropertyController, ShowPropertyByIdController],
    providers: [
        CreatePropertyUseCase,
        ShowPropertyByIdUseCase,
        {
            provide: 'IPropertyRepository',
            useClass: PropertyRepository, 
        }],
    exports: []
})
export class PropertyModule {}