import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { CreateContractUseCase } from "src/application/use-cases/rental-contract/create-contract.usecase";
import { PropertyModel } from "src/infra/database/models/property.model";
import { RentalContractModel } from "src/infra/database/models/rental-contract.model";
import { PropertyRepository } from "src/infra/repositories/sequelize/property.repository";
import { RentalContractRepository } from "src/infra/repositories/sequelize/rental-contract.repository";
import { CreateContractController } from "./create-contract.controller";
import { updateContractStatusController } from "./update-contract-status.controller";
import { updateContractStatusUseCase } from "src/application/use-cases/rental-contract/update-status-contract.usecase";

@Module({
    controllers: [
        CreateContractController,
        updateContractStatusController
    ],
    providers: [
        CreateContractUseCase,
        updateContractStatusUseCase,
        {
            provide: 'IRentalContractRepository',
            useClass: RentalContractRepository
        },
        {
        provide: 'IPropertyRepository',
        useClass: PropertyRepository,
        }
    ],
    imports: [
        SequelizeModule.forFeature([RentalContractModel, PropertyModel])
    ],
    exports: [

    ]
})
export class RentalContractModule{}