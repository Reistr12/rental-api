import { Controller, Get, UseGuards } from '@nestjs/common';

import { ListPropertiesUseCase } from 'src/application/use-cases/property/list-properties.usecase';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('property')
export class ListPropertiesController {
  constructor(private readonly listPropertiesUseCase: ListPropertiesUseCase) {}
  
  @UseGuards(AuthGuard)
  @Get()
  async listAllProperties() {
    return await this.listPropertiesUseCase.execute();
  }
}
