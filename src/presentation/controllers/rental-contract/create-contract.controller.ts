import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { userInfo } from "os";
import { CreateContractDto } from "src/application/dtos/rental-contract/create-contract.dto";
import { AuthGuard } from "src/auth/auth.guard";
import { CurrentUser } from "src/common/decorators/current-user.decorator";

@Controller('contract')
export class CreateContractController{
    
    @UseGuards(AuthGuard)
    @Post()
    async createContract(@CurrentUser() userInfo, @Body() data: CreateContractDto){

    }

}