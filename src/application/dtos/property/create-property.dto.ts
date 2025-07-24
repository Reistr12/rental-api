import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsDate,
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

  @IsNumber()
  @IsPositive({ message: 'O preço do imóvel deve ser maior que zero.' })
  price: number;

  @IsString()
  @IsNotEmpty({ message: 'Proprietário é obrigatório.' })
  ownerId: string;
}
