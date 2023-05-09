import { Test } from '@nestjs/testing';
import { UserModelMock } from './mocks/user.model.mock';
import { User, UserDocument } from '../../../src/users/schemas/user.schema';
import { UsersService } from '../../../src/users/users.service';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { usersFaker, commonUserFaker } from '../../faker/users.faker';
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
      const user = await usersService.findById(usersFaker._id);

      expect(user).toStrictEqual(usersFaker);
    });
  });

  describe('findOne method', () => {
    it('shold be return user', async () => {
      const user = await usersService.findOne({ emailId: usersFaker.emailId });
      expect(user).toStrictEqual(usersFaker);
    });
  });

  describe('Create function', () => {
    it('shold be return users when user create', async () => {
      const user = await usersService.create({
        firstName: usersFaker.firstName,
        emailId: commonUserFaker.emailId,
        password: usersFaker.password,
        lastName: usersFaker.lastName,
      });
      expect(user).toStrictEqual(usersFaker);
    });

    it('shold be throw BadRequestException when user exist', async () => {
      expect(
        usersService.create({
          firstName: usersFaker.firstName,
          emailId: usersFaker.emailId,
          password: usersFaker.password,
          lastName: usersFaker.lastName,
        }),
      ).rejects.toThrow(BadRequestException);
    });
  });
});
