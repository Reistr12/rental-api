import { Body, Controller, Delete, Param, UseGuards } from "@nestjs/common";
import { userInfo } from "os";
import { DeletePropertyUseCase } from "src/application/use-cases/property/delete-property.usecase";
import { DeleteUserUseCase } from "src/application/use-cases/user/delete-user.usecase";
import { AuthGuard } from "src/auth/auth.guard";
import { CurrentUser } from "src/common/decorators/current-user.decorator";

@Controller('properties')
export class DeletePropertyController {
  constructor(
    private readonly deletePropertyUseCase: DeletePropertyUseCase,
  ) {}
  
  @UseGuards(AuthGuard)
  @Delete(':id')
    async delete(@CurrentUser() userInfo, @Param('id') id: string): Promise<any> {
    await this.deletePropertyUseCase.execute(userInfo.sub, id);
  }

}