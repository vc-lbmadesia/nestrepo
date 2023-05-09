import { Test } from '@nestjs/testing';
import { AuthController } from '../../../src/auth/auth.controller';
import { AuthService } from '../../../src/auth/auth.service';
import { AuthServiceMock } from './mocks/auth.service.mock';
import { usersFaker } from '../../faker/users.faker';

describe('Controller', () => {
  let authController: AuthController;
  let authService: AuthServiceMock;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useClass: AuthServiceMock,
        },
      ],
    }).compile();

    authService = module.get<AuthServiceMock>(AuthService);
    authController = module.get<AuthController>(AuthController);
  });

  describe('AuthController', () => {
    it('should be defined', () => {
      expect(authController).toBeDefined();
    });

    it('should be return token', async () => {
      const responseData = await authController.signIn({
        user: { emailId: usersFaker.emailId, _id: usersFaker.emailId },
      });

      expect(responseData).toHaveProperty('token');
    });
  });
});
