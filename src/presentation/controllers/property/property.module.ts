import { Module } from "@nestjs/common";
import { CreatePropertyUseCase } from "src/application/use-cases/property/create-property.usecase";
import { PropertyRepository } from "src/infra/repositories/sequelize/property.repository";
import { CreatePropertyController } from "./create-property.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { PropertyModel } from "src/infra/database/models/property.model";
import { ShowPropertyByIdController } from "./show-property-by-id.controller";
import { ShowPropertyByIdUseCase } from "src/application/use-cases/property/show-property-by-id.usecase";
import { ListPropertiesController } from "./list-properties.controller";
import { ListPropertiesUseCase } from "src/application/use-cases/property/list-properties.usecase";
import { UpdatePropertyController } from "./update-property.controller";
import { UpdatePropertyUseCase } from "src/application/use-cases/property/update-property.usecase";
import { DeletePropertyUseCase } from "src/application/use-cases/property/delete-property.usecase";
import { DeletePropertyController } from "./delete-property.controller";

@Module({
    imports: [SequelizeModule.forFeature([PropertyModel])],
    controllers: [
        CreatePropertyController,
        ShowPropertyByIdController,
        ListPropertiesController,
        UpdatePropertyController,
        DeletePropertyController
    ],
    providers: [
        CreatePropertyUseCase,
        ShowPropertyByIdUseCase,
        ListPropertiesUseCase,
        UpdatePropertyUseCase,
        DeletePropertyUseCase,
        {
            provide: 'IPropertyRepository',
            useClass: PropertyRepository, 
        }],
    exports: []
})
export class PropertyModule {}