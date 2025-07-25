import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { UserModule } from 'src/presentation/controllers/user/user.module';
import { AuthController } from './auth.controller';
import { AuthGuard } from './auth.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET || 'default',
      signOptions: { expiresIn: '7d' },
    }),
   UserModule,
  ],
  providers: [
    AuthService,
    AuthGuard,
  ],
  controllers: [AuthController],
  exports: [AuthGuard, AuthService],
})
export class AuthModule {}
