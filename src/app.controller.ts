import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {

  @Get('testpublic')
  getPublic() {
    return { message: 'rota pública funcionando' };
  }

  @Get('testprivate')
  getPrivate() {
    return { message: 'rota protegida funcionando' };
  }
}
