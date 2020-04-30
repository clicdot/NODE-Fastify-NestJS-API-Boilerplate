import { Injectable, NestInterceptor, ExecutionContext, CallHandler, ForbiddenException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class GlobalInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest();
    const reply = ctx.getResponse();
    const now = Date.now();
    console.log('Before...');

    return next
      .handle()
      .pipe(
        tap(() => console.log(`After... ${Date.now() - now}ms`)),
      );
  }
}
