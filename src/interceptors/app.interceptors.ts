
import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    var now = Date.now();
    return next
      .handle()
      .pipe(
        tap(() => {
            var elapsed = Date.now() - now;
            var res = context.switchToHttp().getResponse();
            res.header('Server-Timing', `serverdur=${elapsed}`);
        }),
      );
  }
}