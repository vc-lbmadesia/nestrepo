import { IsAlpha, IsEmail, IsNotEmpty, IsOptional, IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { Defaults } from 'config/default.config';
import { validationMessages } from 'config/messages.config';

export class CreateUserDto {
  @IsString()
  @MinLength(2, { message: validationMessages.FIRST_NAME_MIN_LENGTH })
  @MaxLength(50, { message: validationMessages.FIRST_NAME_MAX_LENGTH })
  @IsAlpha('en-US', { message: validationMessages.FIRST_NAME_IS_ALPHA })
  @IsNotEmpty({ message: validationMessages.FIRST_NAME_REQUIRED })
  firstName: string;

  @IsString()
  @MinLength(2, { message: validationMessages.LAST_NAME_MIN_LENGTH })
  @MaxLength(50, { message: validationMessages.LAST_NAME_MAX_LENGTH })
  @IsAlpha('en-US', { message: validationMessages.LAST_NAME_IS_ALPHA })
  @IsOptional()
  lastName: string;

  @MaxLength(100, { message: validationMessages.EMAIL_MAX_LENGTH })
  @IsEmail({}, { message: validationMessages.EMAIL_IS_VALID })
  @IsNotEmpty({ message: validationMessages.EMAIL_REQUIRED })
  emailId: string;

  @Matches(Defaults.USER_PASSWORD_REGEX, { message: validationMessages.PASSWORD_IS_VALID })
  @IsString()
  @IsNotEmpty({ message: validationMessages.PASSWORD_REQUIRED })
  password: string;
}
