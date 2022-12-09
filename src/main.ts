import { join } from 'path';
import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { HttpFilter } from './common/filter';
import { Response } from './common/response';
import { ValidationPipe } from '@nestjs/common';
// import { RoleGuard } from './guard/role/role.guard';
import { NestExpressApplication } from '@nestjs/platform-express';

/** 全局异常(拦截器)过滤器会覆盖管道校验提示；如需验证管道验证请注释第15行代码  */
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  /** 配置静态资源目录访问 */
  app.useStaticAssets(join(__dirname, 'images'));
  /** 全局异常(拦截器)过滤器 */
  app.useGlobalFilters(new HttpFilter());
  /** 全局响应拦截器 */
  app.useGlobalInterceptors(new Response());
  /** 全局管道校验 */
  app.useGlobalPipes(new ValidationPipe());
  /** 全局守卫: 在中间件之后拦截器或管道之前 */
  // app.useGlobalGuards(new RoleGuard());
  await app.listen(3000);
}
bootstrap();
