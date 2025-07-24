import { PropertyEntity } from 'src/domain/entities/property.entity';

export abstract class IPropertyRepository {
  abstract create(property: PropertyEntity): Promise<PropertyEntity>;

  abstract findById(id: string): Promise<PropertyEntity | null>;

  abstract findAll(): Promise<PropertyEntity[]>;

  abstract findByOwnerId(ownerId: string): Promise<PropertyEntity[]>;

  abstract update(property: PropertyEntity): Promise<void>;

  abstract delete(id: string): Promise<void>;
}
