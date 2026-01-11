import { IUserRepository } from '../../domain/repositories/IUserRepository';
import { RegisterRequestDto, UserResponseDto } from '../dtos/UserDto';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export class RegisterUserUseCase {
  constructor(
    private userRepository: IUserRepository,
    private jwtSecret: string
  ) {}

  async execute(registerData: RegisterRequestDto): Promise<UserResponseDto> {
    const { email, password, firstName, lastName } = registerData;

    if (!email || !password || !firstName || !lastName) {
      throw new Error('All fields are required');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error('Invalid email format');
    }

    if (password.length < 6) {
      throw new Error('Password must be at least 6 characters long');
    }

    const existingUser = await this.userRepository.findByEmail(email);

    if (existingUser) {
      throw new Error('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await this.userRepository.create({
      email,
      password: hashedPassword,
      firstName,
      lastName
    });

    const token = jwt.sign(
      { id: newUser.id, email: newUser.email },
      this.jwtSecret,
      { expiresIn: '24h' }
    );

    return {
      id: newUser.id!,
      email: newUser.email,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      token
    };
  }
}
