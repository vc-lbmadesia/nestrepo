import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { Response } from 'express';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { ResponseType } from '../types/response.type';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  constructor(@Inject(WINSTON_MODULE_PROVIDER) private logger: Logger) {}

  catch(exception: Error, host: ArgumentsHost): Response {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    this.logger.error(
      `Error: method: ${request.method} - url :${request.url} - stack:${exception.stack}`,
      exception.stack,
      exception.name,
      GlobalExceptionFilter.name,
    );

    const responseData = {
      status: false,
      statusCode: HttpStatus.BAD_REQUEST,
      message: exception.message,
      data: [],
      error: exception.name,
    };

    if (exception instanceof HttpException) responseData.statusCode = exception.getStatus();

    return response.status(responseData.statusCode).json(responseData);
  }
}
