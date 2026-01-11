import { describe, it, expect, vi, beforeEach } from 'vitest';
import { RegisterUserUseCase } from '../../src/application/use-cases/RegisterUserUseCase';
import { IUserRepository } from '../../src/domain/repositories/IUserRepository';
import { User } from '../../src/domain/entities/User';
import bcrypt from 'bcryptjs';

vi.mock('bcryptjs');

describe('RegisterUserUseCase', () => {
  let userRepository: IUserRepository;
  let registerUserUseCase: RegisterUserUseCase;
  const jwtSecret = 'test-secret';

  beforeEach(() => {
    userRepository = {
      findByEmail: vi.fn(),
      create: vi.fn(),
      findById: vi.fn()
    };
    registerUserUseCase = new RegisterUserUseCase(userRepository, jwtSecret);
  });

  it('should successfully register a new user', async () => {
    const newUser: User = {
      id: '123',
      email: 'newuser@example.com',
      password: 'hashedpassword',
      firstName: 'Jane',
      lastName: 'Doe'
    };

    vi.spyOn(userRepository, 'findByEmail').mockResolvedValue(null);
    vi.spyOn(bcrypt, 'hash').mockResolvedValue('hashedpassword' as never);
    vi.spyOn(userRepository, 'create').mockResolvedValue(newUser);

    const result = await registerUserUseCase.execute({
      email: 'newuser@example.com',
      password: 'password123',
      firstName: 'Jane',
      lastName: 'Doe'
    });

    expect(result).toHaveProperty('id', '123');
    expect(result).toHaveProperty('email', 'newuser@example.com');
    expect(result).toHaveProperty('token');
    expect(result).not.toHaveProperty('password');
  });

  it('should throw error when user already exists', async () => {
    const existingUser: User = {
      id: '123',
      email: 'existing@example.com',
      password: 'hashedpassword',
      firstName: 'John',
      lastName: 'Doe'
    };

    vi.spyOn(userRepository, 'findByEmail').mockResolvedValue(existingUser);

    await expect(
      registerUserUseCase.execute({
        email: 'existing@example.com',
        password: 'password123',
        firstName: 'Jane',
        lastName: 'Doe'
      })
    ).rejects.toThrow('User already exists');
  });

  it('should throw error when email format is invalid', async () => {
    await expect(
      registerUserUseCase.execute({
        email: 'invalid-email',
        password: 'password123',
        firstName: 'Jane',
        lastName: 'Doe'
      })
    ).rejects.toThrow('Invalid email format');
  });

  it('should throw error when password is too short', async () => {
    vi.spyOn(userRepository, 'findByEmail').mockResolvedValue(null);

    await expect(
      registerUserUseCase.execute({
        email: 'newuser@example.com',
        password: '12345',
        firstName: 'Jane',
        lastName: 'Doe'
      })
    ).rejects.toThrow('Password must be at least 6 characters long');
  });

  it('should throw error when required fields are missing', async () => {
    await expect(
      registerUserUseCase.execute({
        email: '',
        password: 'password123',
        firstName: 'Jane',
        lastName: 'Doe'
      })
    ).rejects.toThrow('All fields are required');
  });
});
