import { Module } from "@nestjs/common";
import { RentalContractRepository } from "src/infra/repositories/sequelize/rental-contract.repository";

@Module({
    controllers: [

    ],
    providers: [
        {
            provide: 'IRentalContractRepository',
            useClass: RentalContractRepository
        }
    ],
    imports: [

    ],
    exports: [

    ]
})
export class RentalContractModule{}