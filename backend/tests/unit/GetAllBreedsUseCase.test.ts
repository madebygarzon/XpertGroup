import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GetAllBreedsUseCase } from '../../src/application/use-cases/GetAllBreedsUseCase';
import { IBreedRepository } from '../../src/domain/repositories/IBreedRepository';
import { Breed } from '../../src/domain/entities/Breed';

describe('GetAllBreedsUseCase', () => {
  let breedRepository: IBreedRepository;
  let getAllBreedsUseCase: GetAllBreedsUseCase;

  beforeEach(() => {
    breedRepository = {
      findAll: vi.fn(),
      findById: vi.fn(),
      search: vi.fn()
    };
    getAllBreedsUseCase = new GetAllBreedsUseCase(breedRepository);
  });

  it('should return all breeds', async () => {
    const mockBreeds: Breed[] = [
      {
        id: 'abys',
        name: 'Abyssinian',
        description: 'Active and energetic',
        temperament: 'Active, Energetic',
        origin: 'Egypt',
        life_span: '14 - 15',
        weight: { imperial: '7 - 10', metric: '3 - 5' }
      },
      {
        id: 'aege',
        name: 'Aegean',
        description: 'Social and intelligent',
        temperament: 'Social, Intelligent',
        origin: 'Greece',
        life_span: '9 - 12',
        weight: { imperial: '7 - 10', metric: '3 - 5' }
      }
    ];

    vi.spyOn(breedRepository, 'findAll').mockResolvedValue(mockBreeds);

    const result = await getAllBreedsUseCase.execute();

    expect(result).toEqual(mockBreeds);
    expect(result).toHaveLength(2);
    expect(breedRepository.findAll).toHaveBeenCalledOnce();
  });

  it('should return empty array when no breeds exist', async () => {
    vi.spyOn(breedRepository, 'findAll').mockResolvedValue([]);

    const result = await getAllBreedsUseCase.execute();

    expect(result).toEqual([]);
    expect(result).toHaveLength(0);
  });
});
