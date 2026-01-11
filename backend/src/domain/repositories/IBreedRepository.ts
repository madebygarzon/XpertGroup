import { Breed } from '../entities/Breed';

export interface IBreedRepository {
  findAll(): Promise<Breed[]>;
  findById(breedId: string): Promise<Breed | null>;
  search(query: string): Promise<Breed[]>;
}
