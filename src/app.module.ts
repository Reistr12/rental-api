import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './infra/database/models/user.model';
import { UserModule } from './presentation/controllers/user/user.module';

@Module({
  imports: [
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
  ],
})
export class AppModule {}
