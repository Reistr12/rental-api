import { Inject, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { NOW } from "sequelize";
import { PropertyEntity } from "src/domain/entities/property.entity";
import { IPropertyRepository } from "src/domain/repositories/ipropety.repository";
import { PropertyModel } from "src/infra/database/models/property.model";


@Injectable()
export class PropertyRepository implements IPropertyRepository {
  constructor( @InjectModel(PropertyModel)
    private readonly propertyModel: typeof PropertyModel) {}
  
  async create(property: PropertyEntity): Promise<PropertyModel> {
    return await this.propertyModel.create(property as any);
  }

  async findById(id: string): Promise<PropertyEntity | any> {
    const property = await this.propertyModel.findByPk(id);
    if (!property) {
      throw new Error('Property not found');
    }

    return new PropertyEntity(
      property.id,
      property.title,
      property.description,
      property.address,
      property.price,
      property.ownerId,
      property.createdAt || NOW
    );
  }

  async findAll(): Promise<PropertyEntity[] | any> {
    const properties = await this.propertyModel.findAll();
    if (!properties || properties.length === 0) { 
     throw new Error('No properties found');
    }
    return properties; 
  }

  async findByOwnerId(ownerId: string): Promise<PropertyEntity[]> {
    const properties = await this.propertyModel.findAll({ where: { ownerId } });
    if (!properties || properties.length === 0) {
      throw new Error('No properties found for this owner');
    }
    return properties; 
  }

  async update(property: PropertyEntity): Promise<void> {
    // Implementation for updating a property
  }

  async delete(id: string): Promise<void> {
    // Implementation for deleting a property by ID
  }
}