import mongoose, { Schema, Document } from 'mongoose';
import { User } from '../../../../domain/entities/User';

export interface UserDocument extends Omit<User, 'id'>, Document {}

const UserSchema: Schema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: true
    },
    firstName: {
      type: String,
      required: true,
      trim: true
    },
    lastName: {
      type: String,
      required: true,
      trim: true
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

export const UserModel = mongoose.model<UserDocument>('User', UserSchema);
