import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      // Extrai o token do header Authorization Bearer
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),

      // Chave secreta para validar o token
      secretOrKey: configService.get<string>('JWT_SECRET'),
      
      // Opcional: ignorar expiração (não recomendado)
      // ignoreExpiration: false,
    });
  }
  
  // Esse método é chamado depois que o token é validado
  // payload é o objeto que você colocou no token ao gerar (ex: sub, email)
  async validate(payload: any) {
    // Aqui você pode fazer consultas extras no banco se quiser
    // ou simplesmente retornar os dados para o request.user
    console.log(payload.sub, payload.email, payload.role); // Log para depuração
    return {
      userId: payload.sub,
      email: payload.email,
      role: payload.role, // se você colocou isso no payload
    };
  }
}
