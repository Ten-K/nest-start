import { Logger } from 'src/middleWare';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';

@Module({
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    /** 第一种写法: 指定路由-拦截整个路由的所有方法 */
    // consumer.apply(Logger).forRoutes('user');
    /** 第二种写法:  拦截指定路由的某个请求方法 */
    consumer
      .apply(Logger)
      .forRoutes({ path: 'user', method: RequestMethod.POST });

    /** 第三种写法: 拦截整个控制器的路由的所有方法 */
    // consumer.apply(Logger).forRoutes(UserController);
  }
}
