import { CatImage } from '../entities/CatImage';

export interface ICatImageRepository {
  findByBreedId(breedId: string, limit?: number): Promise<CatImage[]>;
}
