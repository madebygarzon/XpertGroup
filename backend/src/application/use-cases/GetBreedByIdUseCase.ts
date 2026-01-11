import { Breed } from '../../domain/entities/Breed';
import { IBreedRepository } from '../../domain/repositories/IBreedRepository';

export class GetBreedByIdUseCase {
  constructor(private breedRepository: IBreedRepository) {}

  async execute(breedId: string): Promise<Breed | null> {
    if (!breedId || breedId.trim() === '') {
      throw new Error('Breed ID is required');
    }

    return await this.breedRepository.findById(breedId);
  }
}
