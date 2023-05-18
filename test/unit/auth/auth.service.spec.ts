import { Test } from '@nestjs/testing';
import { AuthService } from '../../../src/auth/auth.service';
import { JwtServiceMock } from './mocks/jwt.service.mock';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../../../src/users/users.service';
import { UsersServiceMock } from './mocks/users.service.mock';
import { usersFaker } from '../../faker/users.faker';

describe('AuthService', () => {
  let authService: AuthService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useClass: UsersServiceMock,
        },
        {
          provide: JwtService,
          useClass: JwtServiceMock,
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  describe('AuthService', () => {
    it('should be defined', () => {
      expect(authService).toBeDefined();
    });

    describe('signIn', () => {
      it('should be return token', async () => {
        const tokenData = await authService.signIn({ emailId: usersFaker.emailId, _id: usersFaker.emailId });

        expect(tokenData).toHaveProperty('token');
        expect(tokenData).toHaveProperty('tokenType');
        expect(tokenData.token).not.toBeNull();
      });
    });

    describe('validateUser', () => {
      it('should be return user if match emailId and password', async () => {
        const userData = await authService.validateUser({ emailId: usersFaker.emailId, password: usersFaker.password });

        expect(userData._id).toHaveProperty('_id');
      });

      it('should be return null if not match emailId and password', async () => {
        const userData = await authService.validateUser({ emailId: usersFaker.emailId, password: '654@dgdfK' });

        expect(userData).toBeNull();
      });
    });
  });
});
