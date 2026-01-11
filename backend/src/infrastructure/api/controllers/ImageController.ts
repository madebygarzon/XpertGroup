import { Request, Response, NextFunction } from 'express';
import { GetImagesByBreedIdUseCase } from '../../../application/use-cases/GetImagesByBreedIdUseCase';

export class ImageController {
  constructor(private getImagesByBreedIdUseCase: GetImagesByBreedIdUseCase) {}

  getImagesByBreedId = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { breed_id } = req.query;
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;

      if (!breed_id || typeof breed_id !== 'string') {
        return res.status(400).json({
          status: 'error',
          message: 'Query parameter "breed_id" is required'
        });
      }

      const images = await this.getImagesByBreedIdUseCase.execute(breed_id, limit);

      return res.status(200).json({
        status: 'success',
        data: images,
        count: images.length
      });
    } catch (error) {
      return next(error);
    }
  };
}
