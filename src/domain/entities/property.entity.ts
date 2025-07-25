export class PropertyEntity {
  constructor(
    public readonly id: string,
    public title: string,
    public description: string,
    public address: string,
    public price: number,
    public ownerId: string,
    public readonly createdAt: Date = new Date(),
  ) {
    if (!title || title.trim().length === 0) {
      throw new Error('Título é obrigatório.');
    }

    if (price <= 0) {
      throw new Error('O preço do imóvel deve ser maior que zero.');
    }

    if (!ownerId) {
      throw new Error('Proprietário é obrigatório.');
    }
  }
}
