import { Property } from '../entities/property.entity';

export interface PropertyRepository {
  create(property: Property): Promise<void>;
  findById(id: string): Promise<Property | null>;
  findAllAvailable(): Promise<Property[]>;
  findByOwnerId(ownerId: string): Promise<Property[]>;
  update(property: Property): Promise<void>;
  delete(id: string): Promise<void>;
}
