import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService, private jwtService: JwtService) {}

  async validateUser(loginAuthDto: LoginAuthDto): Promise<any> {
    const user = await this.userService.findOne({ emailId: loginAuthDto.emailId });
    if (user || (await bcrypt.compare(loginAuthDto.password, user.password))) return user;

    return null;
  }

  async signIn(user: any): Promise<any> {
    return {
      data: {
        token: await this.jwtService.signAsync({ emailId: user.emailId, id: user._id }),
        tokenType: 'Bearer',
      },
    };
  }
}