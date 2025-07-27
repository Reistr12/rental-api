
import {
  IsUUID,
  IsDateString
} from 'class-validator';

export class CreateContractDto {
  @IsUUID('4', { message: 'propertyId deve ser um UUID válido.' })
  propertyId: string;

  @IsDateString({}, { message: 'startDate deve ser uma data válida no formato ISO (YYYY-MM-DD).' })
  startDate: string;

  @IsDateString({}, { message: 'endDate deve ser uma data válida no formato ISO (YYYY-MM-DD).' })
  endDate: string;

  @IsUUID('4', { message: 'tenantId deve ser um UUID válido.' })
  tenantId: string;

}
