import { Type } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsOptional,
  IsUUID,
} from 'class-validator';
import { CreatePropertyDto } from './create-property.dto';
import { PartialType } from '@nestjs/mapped-types';

export class updatePropertyDto extends PartialType(CreatePropertyDto) {
    @IsUUID()
    @IsOptional()
    id: string;
}
