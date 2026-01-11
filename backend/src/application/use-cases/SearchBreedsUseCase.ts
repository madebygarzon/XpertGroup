import { Breed } from '../../domain/entities/Breed';
import { IBreedRepository } from '../../domain/repositories/IBreedRepository';

export class SearchBreedsUseCase {
  constructor(private breedRepository: IBreedRepository) {}

  async execute(query: string): Promise<Breed[]> {
    if (!query || query.trim() === '') {
      throw new Error('Search query is required');
    }

    return await this.breedRepository.search(query);
  }
}
