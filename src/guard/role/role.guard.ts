import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import type { Request } from 'express';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

/**
 * 在地址栏输入 - http://localhost:3000/guard?role=admin 请求通过
 * 在地址栏输入 - http://localhost:3000/guard?role=111 请求被守卫拦截，返回403
 */
@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private Reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    /** 获取接口元信息 */
    const admin = this.Reflector.get<string[]>('role', context.getHandler());
    console.log('admin :>> ', admin);
    /** 获取请求的参数 */
    const req = context.switchToHttp().getRequest<Request>();
    /** 如果请求参数符合元信息要求，通过守卫 */
    if (admin.includes(req.query.role as string)) {
      return true;
    }
    return false;
  }
}
