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
  ) {}

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
