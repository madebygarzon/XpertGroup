import { Request, Response, NextFunction } from 'express';
import { GetAllBreedsUseCase } from '../../../application/use-cases/GetAllBreedsUseCase';
import { GetBreedByIdUseCase } from '../../../application/use-cases/GetBreedByIdUseCase';
import { SearchBreedsUseCase } from '../../../application/use-cases/SearchBreedsUseCase';

export class BreedController {
  constructor(
    private getAllBreedsUseCase: GetAllBreedsUseCase,
    private getBreedByIdUseCase: GetBreedByIdUseCase,
    private searchBreedsUseCase: SearchBreedsUseCase
  ) {}

  getAllBreeds = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const breeds = await this.getAllBreedsUseCase.execute();

      res.status(200).json({
        status: 'success',
        data: breeds,
        count: breeds.length
      });
    } catch (error) {
      next(error);
    }
  };

  getBreedById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { breed_id } = req.params;
      const breed = await this.getBreedByIdUseCase.execute(breed_id);

      if (!breed) {
        return res.status(404).json({
          status: 'error',
          message: 'Breed not found'
        });
      }

      return res.status(200).json({
        status: 'success',
        data: breed
      });
    } catch (error) {
      return next(error);
    }
  };

  searchBreeds = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { q } = req.query;

      if (!q || typeof q !== 'string') {
        return res.status(400).json({
          status: 'error',
          message: 'Query parameter "q" is required'
        });
      }

      const breeds = await this.searchBreedsUseCase.execute(q);

      return res.status(200).json({
        status: 'success',
        data: breeds,
        count: breeds.length
      });
    } catch (error) {
      return next(error);
    }
  };
}
