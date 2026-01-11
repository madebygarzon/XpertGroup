import { Request, Response, NextFunction } from 'express';
import { LoginUserUseCase } from '../../../application/use-cases/LoginUserUseCase';
import { RegisterUserUseCase } from '../../../application/use-cases/RegisterUserUseCase';

export class UserController {
  constructor(
    private loginUserUseCase: LoginUserUseCase,
    private registerUserUseCase: RegisterUserUseCase
  ) {}

  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;

      const result = await this.loginUserUseCase.execute({ email, password });

      return res.status(200).json({
        status: 'success',
        data: result
      });
    } catch (error) {
      if (error instanceof Error && error.message === 'Invalid credentials') {
        return res.status(401).json({
          status: 'error',
          message: 'Invalid credentials'
        });
      }
      return next(error);
    }
  };

  register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password, firstName, lastName } = req.body;

      const result = await this.registerUserUseCase.execute({
        email,
        password,
        firstName,
        lastName
      });

      return res.status(201).json({
        status: 'success',
        data: result
      });
    } catch (error) {
      if (error instanceof Error && error.message === 'User already exists') {
        return res.status(409).json({
          status: 'error',
          message: 'User already exists'
        });
      }
      return next(error);
    }
  };
}
