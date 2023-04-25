import { AuthService } from 'src/auth/auth.service';
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { errorMessages } from 'config/messages.config';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'emailId',
    });
  }

  async validate(emailId: string, password: string): Promise<any> {
    const user = await this.authService.validateUser({ emailId, password });

    if (!user) throw new UnauthorizedException(errorMessages.INVALID_CREDENTIAL);

    return user;
  }
}
