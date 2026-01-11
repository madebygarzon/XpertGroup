import { Breed } from '../../domain/entities/Breed';
import { IBreedRepository } from '../../domain/repositories/IBreedRepository';

export class GetAllBreedsUseCase {
  constructor(private breedRepository: IBreedRepository) {}

  async execute(): Promise<Breed[]> {
    return await this.breedRepository.findAll();
  }
}
