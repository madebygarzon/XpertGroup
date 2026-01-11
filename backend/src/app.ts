import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { config } from './shared/config/environment';
import { errorHandler } from './infrastructure/api/middlewares/errorHandler';

export const createApp = (
  breedRouter: express.Router,
  imageRouter: express.Router,
  userRouter: express.Router
): Application => {
  const app: Application = express();

  app.use(cors({
    origin: config.cors.origin,
    credentials: true
  }));

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.get('/health', (_req: Request, res: Response) => {
    res.status(200).json({
      status: 'success',
      message: 'Cat API is running',
      timestamp: new Date().toISOString()
    });
  });

  app.use('/api/breeds', breedRouter);
  app.use('/api/images', imageRouter);
  app.use('/api/users', userRouter);

  app.use('*', (req: Request, res: Response) => {
    res.status(404).json({
      status: 'error',
      message: `Route ${req.originalUrl} not found`
    });
  });

  app.use(errorHandler);

  return app;
};
