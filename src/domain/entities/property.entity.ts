export class Property {
  constructor(
    public readonly id: string,
    public ownerId: string, // refere-se ao User (locador)
    public title: string,
    public description: string,
    public address: string,
    public pricePerMonth: number,
    public available: boolean = true,
    public createdAt: Date = new Date()
  ) {}

  markAsUnavailable() {
    this.available = false;
  }

  markAsAvailable() {
    this.available = true;
  }
}
