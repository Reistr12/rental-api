import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { CreatePropertyDto } from "src/application/dtos/property/create-property.dto";
import { CreatePropertyUseCase } from "src/application/use-cases/property/create-property.usecase";


@Controller('properties')
export class CreatePropertyController {
    constructor(
        private readonly createPropertyUseCase: CreatePropertyUseCase, 
    ) {}
  @Post()
    async createProperty(@Body() data: CreatePropertyDto): Promise<any> {
      return await this.createPropertyUseCase.execute(data);
    }
}