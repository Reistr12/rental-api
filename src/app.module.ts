import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './infra/database/models/user.model';
import { UserModule } from './presentation/controllers/user/user.module';
import { PropertyModule } from './presentation/controllers/property/property.module';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { RentalContractModule } from './presentation/controllers/rental-contract/rental-contract.module';

@Module({
  imports: [
    AuthModule,
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'rental_db',
      autoLoadModels: true,
      synchronize: true, // Em produção, use migrations no lugar
      models: [User], // Lista de models
    }),
    UserModule,
    AuthModule,
    PropertyModule,
    RentalContractModule
  ],
  providers: [],
  controllers: [AppController]
})
export class AppModule {}
