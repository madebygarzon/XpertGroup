import { describe, it, expect, vi, beforeEach } from 'vitest';
import { LoginUserUseCase } from '../../src/application/use-cases/LoginUserUseCase';
import { IUserRepository } from '../../src/domain/repositories/IUserRepository';
import { User } from '../../src/domain/entities/User';
import bcrypt from 'bcryptjs';

vi.mock('bcryptjs');

describe('LoginUserUseCase', () => {
  let userRepository: IUserRepository;
  let loginUserUseCase: LoginUserUseCase;
  const jwtSecret = 'test-secret';

  beforeEach(() => {
    userRepository = {
      findByEmail: vi.fn(),
      create: vi.fn(),
      findById: vi.fn()
    };
    loginUserUseCase = new LoginUserUseCase(userRepository, jwtSecret);
  });

  it('should successfully login with valid credentials', async () => {
    const mockUser: User = {
      id: '123',
      email: 'test@example.com',
      password: 'hashedpassword',
      firstName: 'John',
      lastName: 'Doe'
    };

    vi.spyOn(userRepository, 'findByEmail').mockResolvedValue(mockUser);
    vi.spyOn(bcrypt, 'compare').mockResolvedValue(true as never);

    const result = await loginUserUseCase.execute({
      email: 'test@example.com',
      password: 'password123'
    });

    expect(result).toHaveProperty('id', '123');
    expect(result).toHaveProperty('email', 'test@example.com');
    expect(result).toHaveProperty('token');
    expect(result).not.toHaveProperty('password');
  });

  it('should throw error when user not found', async () => {
    vi.spyOn(userRepository, 'findByEmail').mockResolvedValue(null);

    await expect(
      loginUserUseCase.execute({
        email: 'nonexistent@example.com',
        password: 'password123'
      })
    ).rejects.toThrow('Invalid credentials');
  });

  it('should throw error when password is incorrect', async () => {
    const mockUser: User = {
      id: '123',
      email: 'test@example.com',
      password: 'hashedpassword',
      firstName: 'John',
      lastName: 'Doe'
    };

    vi.spyOn(userRepository, 'findByEmail').mockResolvedValue(mockUser);
    vi.spyOn(bcrypt, 'compare').mockResolvedValue(false as never);

    await expect(
      loginUserUseCase.execute({
        email: 'test@example.com',
        password: 'wrongpassword'
      })
    ).rejects.toThrow('Invalid credentials');
  });

  it('should throw error when email is empty', async () => {
    await expect(
      loginUserUseCase.execute({
        email: '',
        password: 'password123'
      })
    ).rejects.toThrow('Email and password are required');
  });

  it('should throw error when password is empty', async () => {
    await expect(
      loginUserUseCase.execute({
        email: 'test@example.com',
        password: ''
      })
    ).rejects.toThrow('Email and password are required');
  });
});
