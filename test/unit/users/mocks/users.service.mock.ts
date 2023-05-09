import { CreateUserDto } from '../../../../src/users/dto/create-user.dto';
import mongoose from 'mongoose';
import { usersFaker } from '../../../faker/users.faker';
import { successMessages } from '../../../../config/messages.config';

export class UsersServiceMock {
  async create(createUserDto: CreateUserDto): Promise<any> {
    return usersFaker;
  }

  async findOne(query: object): Promise<any> {
    return usersFaker;
  }

  async findById(id: mongoose.Types.ObjectId): Promise<any> {
    if (id === usersFaker._id) return usersFaker;
  }
}
