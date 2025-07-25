import { Controller, Get, Param, ParseUUIDPipe, UseGuards } from "@nestjs/common";
import { ShowPropertyByIdUseCase } from "src/application/use-cases/property/show-property-by-id.usecase";
import { AuthGuard } from "src/auth/auth.guard";

@Controller('property')
export class ShowPropertyByIdController {
    constructor(
        private readonly showPropertyByIdUseCase: ShowPropertyByIdUseCase, 
    ) {}
  
    @UseGuards(AuthGuard)
    @Get(':id')
    async showPropertyById(@Param('id', ParseUUIDPipe) id: string): Promise<any> {
        console.log("===========================================================================");
        console.log(id)
        return await this.showPropertyByIdUseCase.execute(id);
    }
}