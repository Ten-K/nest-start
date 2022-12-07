import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

/**
 * 中间件: 路由处理程序之前调用。可以访问请求和响应对象
 */
@Injectable()
export class Logger implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('我是中间件，我被访问啦');
    res.send('我被拦截了');
    /** 如果没有调用next函数，请求会被挂起 */
    // next();
  }
}
