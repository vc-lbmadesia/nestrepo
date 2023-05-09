import { Test } from '@nestjs/testing';
import { UsersController } from '../../../src/users/users.controller';
import { UsersService } from '../../../src/users/users.service';
import { usersFaker } from '../../faker/users.faker';
import { UsersServiceMock } from './mocks/users.service.mock';
import { successMessages } from '../../../config/messages.config';

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersServiceMock;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useClass: UsersServiceMock,
        },
      ],
    }).compile();

    usersController = module.get<UsersController>(UsersController);
    usersService = module.get<UsersServiceMock>(UsersService);
  });

  it('should be defined', () => {
    expect(usersController).toBeDefined();
  });

  // test cases to create function of UsersController
  describe('user create', () => {
    let result;

    it('should be return response object', async () => {
      result = await usersController.create({
        firstName: usersFaker.firstName,
        emailId: usersFaker.emailId,
        password: usersFaker.password,
        lastName: usersFaker.lastName,
      });
      expect(result).toHaveProperty('data');
    });

    it('should be return user data', async () => {
      expect(result.data).toStrictEqual(usersFaker);
    });
  });

  // test cases to profile function of UsersController
  describe('user profile', () => {
    let result;

    it('should be return response object', async () => {
      const req = { user: { id: usersFaker._id } };
      result = await usersController.profile(req);
      expect(result).toHaveProperty('data');
    });

    it('should be return user profile data', async () => {
      expect(result.data).toStrictEqual(usersFaker);
    });
  });
});
