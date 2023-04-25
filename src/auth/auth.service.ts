import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { errorMessages } from 'config/messages.config';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService, private jwtService: JwtService) {}

  async signIn(loginAuthDto: LoginAuthDto): Promise<any> {
    const user = await this.userService.findOne({ emailId: loginAuthDto.emailId });

    if (!user || !(await bcrypt.compare(loginAuthDto.password, user.password)))
      throw new UnauthorizedException(errorMessages.INVALID_CREDENTIAL);

    return {
      data: {
        token: await this.jwtService.signAsync({ emailId: user.emailId, id: user._id }),
        tokenType: 'Bearer',
      },
    };
  }
}
