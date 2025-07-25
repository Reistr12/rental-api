// src/auth/guards/jwt-auth.guard.ts
import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
    console.log('\n🚨 JwtAuthGuard FOI CARREGADO PELO NEST ✅\n');
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    console.log('\n=========== [DEBUG JwtAuthGuard] ===========');
    console.log('Handler:', context.getHandler().name);
    console.log('Classe:', context.getClass().name);
    console.log('É rota pública?', isPublic);
    console.log('============================================\n');

    if (isPublic) {
      return true;
    }

    return super.canActivate(context);
  }
}
