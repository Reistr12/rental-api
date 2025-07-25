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

  async findById(id: string): Promise<any> {
    const property = await this.propertyModel.findByPk(id);
    if (!property) {
      return null; 
    }


  return new PropertyEntity(
    property.id,
    property.title,
    property.description,
    property.address,
    property.price,
    property.ownerId,
    property.createdAt ?? new Date()
  );

  }

  async findAll(): Promise<PropertyEntity[]> {
    const properties = await PropertyModel.findAll();
    return properties.map(
      (p) =>
        new PropertyEntity(
          p.id,
          p.title,
          p.description,
          p.address,
          p.price,
          p.ownerId,
          p.createdAt,
        ),
    );
  }


  async findByOwnerId(ownerId: string): Promise<PropertyEntity[]> {
    const properties = await this.propertyModel.findAll({ where: { ownerId } });
    if (!properties || properties.length === 0) {
      throw new Error('No properties found for this owner');
    }
    return properties; 
  }
  
  async update(property: PropertyEntity): Promise<any> {
    const existingProperty = await PropertyModel.findByPk(property.id);
    console.log(existingProperty)
    if (existingProperty) {
      await existingProperty.update({
        title: property.title,
        description: property.description,
        address: property.address,
        price: property.price,
      });
    } else {
      throw new Error('Property not found');
    }
    return new PropertyEntity(
      property.id ?? existingProperty.id,
      property.title,
      property.description,
      existingProperty.address,
      property.price,
      existingProperty.ownerId,
    )
  }

  async delete(id: string): Promise<any> {
      const deleted = await PropertyModel.destroy({ where: { id } });
      if (deleted === 0) {
        
         throw new Error('User not found');
      }
      return { message: 'User deleted successfully' };
    }
}