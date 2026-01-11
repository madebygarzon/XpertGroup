import { Router } from 'express';
import { ImageController } from '../controllers/ImageController';

export const createImageRouter = (imageController: ImageController): Router => {
  const router = Router();

  router.get('/imagesbybreedid', imageController.getImagesByBreedId);

  return router;
};
