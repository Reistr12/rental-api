export type ContractStatus = 'PENDING' | 'APPROVED' | 'REJECTED';

export class RentalContractEntity {
  constructor(
    public readonly id: string,
    public propertyId: string,
    public tenantId: string,
    public startDate: Date,
    public endDate: Date,
    public monthlyValue: number,
    public isActive: boolean = true,
    public contractStatus: ContractStatus = 'PENDING',
    public created_at: Date = new Date()
  ) {}

  approve() {
    if (this.contractStatus !== 'PENDING') {
      throw new Error('O contrato já foi processado.');
    }
    this.contractStatus = 'APPROVED';
  }

  reject() {
    if (this.contractStatus !== 'PENDING') {
      throw new Error('O contrato já foi processado.');
    }
    this.contractStatus = 'REJECTED';
    this.isActive = false;
  }

  cancelContract() {
    this.isActive = false;
  }

  extendContract(newEndDate: Date) {
    if (newEndDate <= this.endDate) {
      throw new Error('Nova data deve ser maior que a atual');
    }
    this.endDate = newEndDate;
  }
}
