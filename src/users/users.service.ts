import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './schemas/user.schema';
import mongoose, { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { errorMessages } from '../../config/messages.config';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto): Promise<UserDocument> {
    let user;
    user = await this.userModel.findOne({ emailId: createUserDto.emailId });
    if (user) throw new BadRequestException(`${errorMessages.EMAIL_ALREADY_EXISTS} ${user.firstName}.`);

    user = await this.userModel.create(createUserDto);

    return user;
  }

  findOne(query: object): Promise<UserDocument> {
    return this.userModel.findOne(query, { password: 1, emailId: 1 }).lean();
  }

  findById(id: mongoose.Types.ObjectId): Promise<UserDocument> {
    return this.userModel.findById(id).lean();
  }
}
