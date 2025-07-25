import { Controller, Get } from '@nestjs/common';
import { Public } from './auth/decorators/public.decorator';

@Controller()
export class AppController {
  @Public()
  @Get('testpublic')
  getPublic() {
    return { message: 'rota pública funcionando' };
  }

  @Get('testprivate')
  getPrivate() {
    return { message: 'rota protegida funcionando' };
  }
}
