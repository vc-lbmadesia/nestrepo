import { Module } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { RoomsController } from './rooms.controller';
import { JwtStrategy } from '../auth/jwt.strategy';

@Module({
  controllers: [RoomsController],
  providers: [RoomsService, JwtStrategy],
})
export class RoomsModule {}
