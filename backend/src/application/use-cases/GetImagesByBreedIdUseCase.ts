import { CatImage } from '../../domain/entities/CatImage';
import { ICatImageRepository } from '../../domain/repositories/ICatImageRepository';

export class GetImagesByBreedIdUseCase {
  constructor(private catImageRepository: ICatImageRepository) {}

  async execute(breedId: string, limit: number = 10): Promise<CatImage[]> {
    if (!breedId || breedId.trim() === '') {
      throw new Error('Breed ID is required');
    }

    if (limit < 1 || limit > 100) {
      throw new Error('Limit must be between 1 and 100');
    }

    return await this.catImageRepository.findByBreedId(breedId, limit);
  }
}
