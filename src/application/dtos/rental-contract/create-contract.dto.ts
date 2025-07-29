
import {
  IsUUID,
  IsDateString
} from 'class-validator';

export class CreateContractDto {

  @IsDateString({}, { message: 'startDate deve ser uma data válida no formato ISO (YYYY-MM-DD).' })
  startDate: string;

  @IsDateString({}, { message: 'endDate deve ser uma data válida no formato ISO (YYYY-MM-DD).' })
  endDate: string;


}
