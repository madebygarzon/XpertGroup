import { Router } from 'express';
import { UserController } from '../controllers/UserController';
import { body } from 'express-validator';
import { validateRequest } from '../middlewares/validateRequest';

export const createUserRouter = (userController: UserController): Router => {
  const router = Router();

  router.post(
    '/login',
    [
      body('email').isEmail().withMessage('Valid email is required'),
      body('password').notEmpty().withMessage('Password is required'),
      validateRequest
    ],
    userController.login
  );

  router.post(
    '/register',
    [
      body('email').isEmail().withMessage('Valid email is required'),
      body('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long'),
      body('firstName').notEmpty().withMessage('First name is required'),
      body('lastName').notEmpty().withMessage('Last name is required'),
      validateRequest
    ],
    userController.register
  );

  return router;
};
