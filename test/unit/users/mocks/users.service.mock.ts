import { CreateUserDto } from '../../../../src/users/dto/create-user.dto';
import mongoose from 'mongoose';
import { usersStub } from '../stubs/users.stub';
import { UserDocument } from '../../../../src/users/schemas/user.schema';
import { successMessages } from '../../../../config/messages.config';

export class UsersServiceMock {
  async create(createUserDto: CreateUserDto): Promise<any> {
    return { data: usersStub, message: successMessages.USER_CREATE };
  }

  async findOne(query: object): Promise<any> {
    return usersStub;
  }

  async findById(id: mongoose.Types.ObjectId): Promise<any> {
    console.log('id ==============================', id);
    if (id === usersStub._id) return usersStub;
  }
}
