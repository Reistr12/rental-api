import { HttpException, HttpStatus } from '@nestjs/common';

export class RentalContract {
  constructor(
    public readonly id: string,
    public propertyId: string,
    public tenantId: string, // inquilino (User)
    public startDate: Date,
    public endDate: Date,
    public monthlyValue: number,
    public isActive: boolean = true,
    public createdAt: Date = new Date()
  ) {
    this.validateDates();
    this.validatePrice();
  }

  private validateDates() {
    const now = new Date();
    if (this.startDate < now) {
      throw new HttpException('A data de início não pode ser no passado.', HttpStatus.BAD_REQUEST);
    }

    if (this.endDate <= this.startDate) {
      throw new HttpException('A data de término deve ser posterior à data de início.', HttpStatus.BAD_REQUEST);
    }
  }

  private validatePrice() {
    if (this.monthlyValue <= 0) {
      throw new HttpException('O valor mensal deve ser maior que zero.', HttpStatus.BAD_REQUEST);
    }
  }

  cancelContract() {
    if (!this.isActive) {
      throw new HttpException('O contrato já está cancelado.', HttpStatus.BAD_REQUEST);
    }
    this.isActive = false;
  }

  extendContract(newEndDate: Date) {
    if (newEndDate <= this.endDate) {
      throw new HttpException('A nova data deve ser maior que a data atual de término.', HttpStatus.BAD_REQUEST);
    }

    this.endDate = newEndDate;
  }
}
