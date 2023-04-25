import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { errorMessages } from 'config/messages.config';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto): Promise<any> {
    let user;
    user = await this.userModel.findOne({ emailId: createUserDto.emailId });
    if (user) throw new BadRequestException(`${errorMessages.EMAIL_ALREADY_EXISTS} ${user.firstName}.`);

    user = await this.userModel.create(createUserDto);

    return { data: user, message: 'user created successfully' };
  }

  findOne(query: object): Promise<any> {
    return this.userModel.findOne(query, { password: 1, emailId: 1 }).lean();
  }

  findById(id: number) {
    return `This action return user`;
  }

  findAll() {
    return `This action returns all users`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
