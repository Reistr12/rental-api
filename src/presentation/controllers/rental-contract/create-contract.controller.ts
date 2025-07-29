import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, UseGuards } from "@nestjs/common";
import { CreateContractDto } from "src/application/dtos/rental-contract/create-contract.dto";
import { CreateContractUseCase } from "src/application/use-cases/rental-contract/create-contract.usecase";
import { AuthGuard } from "src/auth/auth.guard";
import { CurrentUser } from "src/common/decorators/current-user.decorator";

@Controller('contracts')
export class CreateContractController{
    constructor(private readonly CreateContractUseCase: CreateContractUseCase){}

    @UseGuards(AuthGuard)
    @Post('/:id')
    async createContract(@CurrentUser() userInfo, @Body() data: CreateContractDto, @Param('id') propertyId: any){
        const contract = await this.CreateContractUseCase.execute(userInfo, data, propertyId)
        if(contract === null){
            throw new HttpException('Bad request', HttpStatus.BAD_REQUEST)
        }
        return contract
    }
}