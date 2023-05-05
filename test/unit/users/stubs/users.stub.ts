import { Types } from 'mongoose';
import { faker } from '@faker-js/faker';

export const usersStub = {
  _id: new Types.ObjectId('0000006f58c6b6b8eacfe035'),
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  emailId: faker.internet.email(),
  password: faker.internet.password(),
  isEmailVerified: false,
  isActive: true,
  isDeleted: false,
};

export const commonStub = {
  emailId: faker.internet.email(),
};
