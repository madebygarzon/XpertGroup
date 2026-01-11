import { createApp } from './app';
import { config } from './shared/config/environment';
import { MongoDBConnection } from './infrastructure/database/mongodb/connection';

import { CatApiService } from './infrastructure/external-services/CatApiService';
import { CatApiBreedRepository } from './infrastructure/external-services/CatApiBreedRepository';
import { CatApiImageRepository } from './infrastructure/external-services/CatApiImageRepository';
import { MongoUserRepository } from './infrastructure/database/mongodb/repositories/MongoUserRepository';

import { GetAllBreedsUseCase } from './application/use-cases/GetAllBreedsUseCase';
import { GetBreedByIdUseCase } from './application/use-cases/GetBreedByIdUseCase';
import { SearchBreedsUseCase } from './application/use-cases/SearchBreedsUseCase';
import { GetImagesByBreedIdUseCase } from './application/use-cases/GetImagesByBreedIdUseCase';
import { LoginUserUseCase } from './application/use-cases/LoginUserUseCase';
import { RegisterUserUseCase } from './application/use-cases/RegisterUserUseCase';

import { BreedController } from './infrastructure/api/controllers/BreedController';
import { ImageController } from './infrastructure/api/controllers/ImageController';
import { UserController } from './infrastructure/api/controllers/UserController';

import { createBreedRouter } from './infrastructure/api/routes/breedRoutes';
import { createImageRouter } from './infrastructure/api/routes/imageRoutes';
import { createUserRouter } from './infrastructure/api/routes/userRoutes';

const startServer = async () => {
  try {
    const mongoConnection = MongoDBConnection.getInstance();
    await mongoConnection.connect();

    const catApiService = new CatApiService();

    const breedRepository = new CatApiBreedRepository(catApiService);
    const imageRepository = new CatApiImageRepository(catApiService);
    const userRepository = new MongoUserRepository();

    const getAllBreedsUseCase = new GetAllBreedsUseCase(breedRepository);
    const getBreedByIdUseCase = new GetBreedByIdUseCase(breedRepository);
    const searchBreedsUseCase = new SearchBreedsUseCase(breedRepository);
    const getImagesByBreedIdUseCase = new GetImagesByBreedIdUseCase(imageRepository);
    const loginUserUseCase = new LoginUserUseCase(userRepository, config.jwt.secret);
    const registerUserUseCase = new RegisterUserUseCase(userRepository, config.jwt.secret);

    const breedController = new BreedController(
      getAllBreedsUseCase,
      getBreedByIdUseCase,
      searchBreedsUseCase
    );
    const imageController = new ImageController(getImagesByBreedIdUseCase);
    const userController = new UserController(loginUserUseCase, registerUserUseCase);

    const breedRouter = createBreedRouter(breedController);
    const imageRouter = createImageRouter(imageController);
    const userRouter = createUserRouter(userController);

    const app = createApp(breedRouter, imageRouter, userRouter);

    const server = app.listen(config.server.port, () => {
      console.log(`🚀 Server running on port ${config.server.port}`);
      console.log(`📝 Environment: ${config.server.nodeEnv}`);
      console.log(`🐱 Cat API URL: ${config.catApi.url}`);
    });

    const gracefulShutdown = async () => {
      console.log('\n🛑 Shutting down gracefully...');

      server.close(async () => {
        console.log('✅ HTTP server closed');
        await mongoConnection.disconnect();
        process.exit(0);
      });

      setTimeout(() => {
        console.error('❌ Forced shutdown after timeout');
        process.exit(1);
      }, 10000);
    };

    process.on('SIGTERM', gracefulShutdown);
    process.on('SIGINT', gracefulShutdown);

  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
