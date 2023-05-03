import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ResponseType } from '../types/response.type';

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, ResponseType<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<ResponseType<T>> {
    return next.handle().pipe(
      map((rawData) => {
        const { status = true, message, error, ...data } = rawData;
        const statusCode = context.switchToHttp().getResponse().statusCode;

        return { statusCode, status, message, error, data };
      }),
    );
  }
}
