import { Router } from 'express';
import { BreedController } from '../controllers/BreedController';

export const createBreedRouter = (breedController: BreedController): Router => {
  const router = Router();

  router.get('/search', breedController.searchBreeds);
  router.get('/:breed_id', breedController.getBreedById);
  router.get('/', breedController.getAllBreeds);

  return router;
};
