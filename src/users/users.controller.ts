import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  BadRequestException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { ResponseType } from '../common/types/response.type';
import { UserDocument } from './schemas/user.schema';
import { successMessages } from '../../config/messages.config';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<ResponseType> {
    return { data: await this.usersService.create(createUserDto), message: successMessages.USER_CREATE };
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  async profile(@Request() req: any): Promise<ResponseType> {
    return { data: await this.usersService.findById(req.user.id) };
  }
}
