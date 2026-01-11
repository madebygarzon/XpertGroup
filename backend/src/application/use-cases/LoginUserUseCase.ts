import { IUserRepository } from '../../domain/repositories/IUserRepository';
import { LoginRequestDto, UserResponseDto } from '../dtos/UserDto';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export class LoginUserUseCase {
  constructor(
    private userRepository: IUserRepository,
    private jwtSecret: string
  ) {}

  async execute(loginData: LoginRequestDto): Promise<UserResponseDto> {
    const { email, password } = loginData;

    if (!email || !password) {
      throw new Error('Email and password are required');
    }

    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new Error('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      this.jwtSecret,
      { expiresIn: '24h' }
    );

    return {
      id: user.id!,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      token
    };
  }
}
