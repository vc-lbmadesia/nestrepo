import { PickType } from '@nestjs/mapped-types';
import { IS_STRING } from 'class-validator';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

export class LoginAuthDto extends PickType(CreateUserDto, ['emailId', 'password'] as const) {}
