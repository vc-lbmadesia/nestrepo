import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { validationMessages } from 'config/messages.config';
import { SchemaTypes, Types, HydratedDocument } from 'mongoose';
import validator from 'validator';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true, collection: 'users' })
export class User {
  _id: Types.ObjectId;

  @Prop({
    type: SchemaTypes.String,
    required: [true, validationMessages.EMAIL_REQUIRED],
    unique: [true, validationMessages.EMAIL_ID__UNIQUE],
    maxlength: [100, validationMessages.EMAIL_MAX_LENGTH],
    validate: {
      message: validationMessages.EMAIL_IS_VALID,
      validator: validator.isEmail,
    },
  })
  emailId: string;

  @Prop({
    type: SchemaTypes.String,
    // required: [true, validationMessages.FIRST_NAME_REQUIRED],
    maxlength: [50, validationMessages.FIRST_NAME_MAX_LENGTH],
    minlength: [2, validationMessages.FIRST_NAME_MIN_LENGTH],
    validate: {
      message: validationMessages.FIRST_NAME_IS_ALPHA,
      validator: validator.isAlpha,
    },
  })
  firstName: string;

  @Prop({
    type: SchemaTypes.String,
    // required: [true, validationMessages.LAST_NAME_REQUIRED],
    maxlength: [50, validationMessages.LAST_NAME_MAX_LENGTH],
    minlength: [2, validationMessages.LAST_NAME_MIN_LENGTH],
    validate: {
      message: validationMessages.LAST_NAME_IS_ALPHA,
      validator: validator.isAlpha,
    },
  })
  lastName: string;

  @Prop({
    type: SchemaTypes.String,
    select: false,
    required: [true, validationMessages.PASSWORD_REQUIRED],
    validate: {
      message: validationMessages.PASSWORD_IS_VALID,
      validator: (value: string) =>
        validator.isStrongPassword(value, {
          minLength: 8,
          minSymbols: 1,
          minLowercase: 1,
          minUppercase: 1,
          minNumbers: 1,
        }),
    },
  })
  password: string;

  @Prop({ type: SchemaTypes.String })
  profilePicture: string;

  @Prop({ type: SchemaTypes.String })
  profileThumbnail: string;

  @Prop({ type: SchemaTypes.String })
  emailVerificationToken: string;

  @Prop({ type: SchemaTypes.String })
  emailVerificationExpireTime: string;

  @Prop({ type: SchemaTypes.String })
  resetPasswordToken: string;

  @Prop({ type: SchemaTypes.String })
  resetPasswordExpireTime: string;

  @Prop({ type: SchemaTypes.String })
  appleUserId: string;

  @Prop({ type: SchemaTypes.Boolean, default: false })
  isEmailVerified: boolean;

  @Prop({ type: SchemaTypes.Boolean, default: false })
  isActiveUser: boolean;

  @Prop({ type: SchemaTypes.Boolean, default: false })
  isDeletedUser: boolean;

  validatePassword: (password: string) => boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
