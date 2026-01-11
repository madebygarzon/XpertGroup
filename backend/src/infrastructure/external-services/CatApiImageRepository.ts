import { ICatImageRepository } from '../../domain/repositories/ICatImageRepository';
import { CatImage } from '../../domain/entities/CatImage';
import { CatApiService } from './CatApiService';

export class CatApiImageRepository implements ICatImageRepository {
  constructor(private catApiService: CatApiService) {}

  async findByBreedId(breedId: string, limit: number = 10): Promise<CatImage[]> {
    return await this.catApiService.getImagesByBreedId(breedId, limit);
  }
}
