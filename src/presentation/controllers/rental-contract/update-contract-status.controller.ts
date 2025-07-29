import { Body, Controller, Param, Post, UseGuards } from "@nestjs/common";
import { updateContractStatusUseCase } from "src/application/use-cases/rental-contract/update-status-contract.usecase";
import { AuthGuard } from "src/auth/auth.guard";
import { CurrentUser } from "src/common/decorators/current-user.decorator";

@Controller('contracts')
export class updateContractStatusController{
    constructor(private readonly UpdateContractStatusUseCase: updateContractStatusUseCase){}

    @UseGuards(AuthGuard)
    @Post(':contractid/status')
    async updateStatus(@Param('contractid') contractId: string, @Body('status') newStatus: 'APPROVED' | 'REJECTED', @CurrentUser() userInfo ){
        return await this.UpdateContractStatusUseCase.execute(userInfo, contractId, newStatus )
    }
}