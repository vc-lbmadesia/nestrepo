import {
  BadRequestException,
  Module,
  ValidationError,
  ValidationPipe,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { _TEST_ } from 'config/environment.config';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { errorMessages } from 'config/messages.config';
import { RoomsModule } from './rooms/rooms.module';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { WinstonModule } from 'nest-winston';
import { winstonOptions } from '../config/logger.config';
import { LoggerMiddleware } from './common/middlewares/logger.middleware';
import { GlobalExceptionFilter } from './common/filters/global-exception-filter';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) =>
        _TEST_()
          ? null
          : {
              uri: configService.get<string>('MONGO_URL'),
              useNewUrlParser: true,
              useUnifiedTopology: true,
            },
      inject: [ConfigService],
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    UsersModule,
    RoomsModule,
    WinstonModule.forRootAsync({ useFactory: () => winstonOptions() }),
  ],
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        stopAtFirstError: true,
        exceptionFactory: (validationErrors: ValidationError[] = []): BadRequestException => {
          const errorKey = Object.keys(validationErrors[0].constraints)[0];
          return new BadRequestException(
            validationErrors[0].constraints[`${errorKey}`] || errorMessages.UNEXPECTED_ERROR,
          );
        },
      }),
    },
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
  ],
  controllers: [AppController],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggerMiddleware).forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
