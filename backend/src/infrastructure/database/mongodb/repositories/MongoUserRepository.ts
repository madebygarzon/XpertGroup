import { IUserRepository } from '../../../../domain/repositories/IUserRepository';
import { User } from '../../../../domain/entities/User';
import { UserModel } from '../models/UserModel';

export class MongoUserRepository implements IUserRepository {
  async findByEmail(email: string): Promise<User | null> {
    const user = await UserModel.findOne({ email });
    if (!user) return null;

    return {
      id: user._id.toString(),
      email: user.email,
      password: user.password,
      firstName: user.firstName,
      lastName: user.lastName,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    };
  }

  async create(user: User): Promise<User> {
    const newUser = await UserModel.create(user);

    return {
      id: newUser._id.toString(),
      email: newUser.email,
      password: newUser.password,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      createdAt: newUser.createdAt,
      updatedAt: newUser.updatedAt
    };
  }

  async findById(id: string): Promise<User | null> {
    const user = await UserModel.findById(id);
    if (!user) return null;

    return {
      id: user._id.toString(),
      email: user.email,
      password: user.password,
      firstName: user.firstName,
      lastName: user.lastName,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    };
  }
}
