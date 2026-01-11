import { IBreedRepository } from '../../domain/repositories/IBreedRepository';
import { Breed } from '../../domain/entities/Breed';
import { CatApiService } from './CatApiService';

export class CatApiBreedRepository implements IBreedRepository {
  constructor(private catApiService: CatApiService) {}

  async findAll(): Promise<Breed[]> {
    return await this.catApiService.getAllBreeds();
  }

  async findById(breedId: string): Promise<Breed | null> {
    return await this.catApiService.getBreedById(breedId);
  }

  async search(query: string): Promise<Breed[]> {
    return await this.catApiService.searchBreeds(query);
  }
}
