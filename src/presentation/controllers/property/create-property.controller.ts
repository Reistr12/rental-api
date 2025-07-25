import { Body, Controller, ParseIntPipe, Post, UseGuards } from "@nestjs/common";
import { userInfo } from "os";
import { CreatePropertyDto } from "src/application/dtos/property/create-property.dto";
import { CreatePropertyUseCase } from "src/application/use-cases/property/create-property.usecase";
import { AuthGuard } from "src/auth/auth.guard";
import { CurrentUser } from "src/common/decorators/current-user.decorator";


@Controller('property')
export class CreatePropertyController {
    constructor(
        private readonly createPropertyUseCase: CreatePropertyUseCase, 
    ) {}
  
  @UseGuards(AuthGuard) 
  @Post()
    async createProperty(@CurrentUser() userInfo, @Body() data: CreatePropertyDto): Promise<any> {
      return await this.createPropertyUseCase.execute(data, userInfo);
    }
}