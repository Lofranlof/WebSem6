import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();
    return next.handle().pipe(
      tap(() => {
        if (!context.switchToHttp().getResponse().finished) {
          const elapsed = Date.now() - now;
          const response = context.switchToHttp().getResponse();
          response.header('Server-Timing', `serverdur=${elapsed}`);
        }
      }),
    );
  }
}
