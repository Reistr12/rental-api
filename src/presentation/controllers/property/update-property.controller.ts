import { Body, Controller, Param, Put, UseGuards } from "@nestjs/common";
import { userInfo } from "os";
import { updatePropertyDto } from "src/application/dtos/property/update-property.dto";
import { UpdatePropertyUseCase } from "src/application/use-cases/property/update-property.usecase";
import { AuthGuard } from "src/auth/auth.guard";
import { CurrentUser } from "src/common/decorators/current-user.decorator";

@Controller('property')
export class UpdatePropertyController {
  constructor(
    private readonly updatePropertyUseCase: UpdatePropertyUseCase
  ){}


  @UseGuards(AuthGuard)
  @Put(':id')
    async updateProperty(@CurrentUser() userInfo, @Body() data: updatePropertyDto, @Param('id') id: string) {
        return await this.updatePropertyUseCase.execute(data, userInfo.sub, id);
    }
}