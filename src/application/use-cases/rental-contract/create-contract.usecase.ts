import { Injectable } from "@nestjs/common";
import { RentalContract } from "src/domain/entities/rental-contract.entity";

@Injectable()
export class CreateContractUseCase{
    async execute(data): Promise<RentalContract| null>{
        
    }
}