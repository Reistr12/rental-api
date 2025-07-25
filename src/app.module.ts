import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './infra/database/models/user.model';
import { UserModule } from './presentation/controllers/user/user.module';
import { PropertyModule } from './presentation/controllers/property/property.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guards';

@Module({
  imports: [
   ConfigModule.forRoot({
      isGlobal: true,
    }),
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
    AuthModule
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard, // <-- Agora Nest vai injetar o Reflector corretamente
    },
  ],
  controllers: [AppController]
})
export class AppModule {}
