import { Test } from '@nestjs/testing';
import { UsersController } from '../../../src/users/users.controller';
import { UsersService } from '../../../src/users/users.service';
import { usersStub } from './stubs/users.stub';
import { UsersServiceMock } from './mocks/users.service.mock';
import { successMessages } from '../../../config/messages.config';

describe('Controller', () => {
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

  describe('user create', () => {
    let result;

    it('should be return response object', async () => {
      result = await usersController.create({
        firstName: usersStub.firstName,
        emailId: usersStub.emailId,
        password: usersStub.password,
        lastName: usersStub.lastName,
      });
      expect(result).toStrictEqual({ data: usersStub, message: successMessages.USER_CREATE });
    });

    it('should be return user data', async () => {
      expect(result.data).toStrictEqual(usersStub);
    });
  });
});
