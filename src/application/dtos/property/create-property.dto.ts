import { Type } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsOptional,
} from 'class-validator';

export class CreatePropertyDto {
  @IsString()
  @IsNotEmpty({ message: 'Título é obrigatório.' })
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsNotEmpty({ message: 'Endereço é obrigatório.' })
  address: string;

  @Type(() => Number)
  @IsNumber()
  @IsPositive({ message: 'O preço do imóvel deve ser maior que zero.' })
  price: number;

  @IsString()
  @IsOptional()
  ownerId?: string;
}
