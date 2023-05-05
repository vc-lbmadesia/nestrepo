import { Test } from '@nestjs/testing';
import { UserModelMock } from './mocks/user.model.mock';
import { User, UserDocument } from '../../../src/users/schemas/user.schema';
import { UsersService } from '../../../src/users/users.service';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { usersStub, commonStub } from './stubs/users.stub';
import { BadRequestException } from '@nestjs/common';
describe('UsersService', () => {
  let usersService: UsersService;
  let userModel: Model<UserDocument>;
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getModelToken(User.name),
          useClass: UserModelMock,
        },
      ],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
    userModel = module.get(getModelToken(User.name));
  });

  it('should be defined', () => {
    expect(usersService).toBeDefined();
  });

  describe('findById method', () => {
    it('shold be return user', async () => {
      const user = await usersService.findById(usersStub._id);

      expect(user).toStrictEqual(usersStub);
    });
  });

  describe('findOne method', () => {
    it('shold be return user', async () => {
      const user = await usersService.findOne({ emailId: usersStub.emailId });
      expect(user).toStrictEqual(usersStub);
    });
  });

  describe('Create function', () => {
    it('shold be return users when user create', async () => {
      const user = await usersService.create({
        firstName: usersStub.firstName,
        emailId: commonStub.emailId,
        password: usersStub.password,
        lastName: usersStub.lastName,
      });
      expect(user).toStrictEqual(usersStub);
    });

    it('shold be throw BadRequestException when user exist', async () => {
      expect(
        usersService.create({
          firstName: usersStub.firstName,
          emailId: usersStub.emailId,
          password: usersStub.password,
          lastName: usersStub.lastName,
        }),
      ).rejects.toThrow(BadRequestException);
    });
  });
});
