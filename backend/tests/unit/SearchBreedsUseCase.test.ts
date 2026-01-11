import { describe, it, expect, vi, beforeEach } from 'vitest';
import { SearchBreedsUseCase } from '../../src/application/use-cases/SearchBreedsUseCase';
import { IBreedRepository } from '../../src/domain/repositories/IBreedRepository';
import { Breed } from '../../src/domain/entities/Breed';

describe('SearchBreedsUseCase', () => {
  let breedRepository: IBreedRepository;
  let searchBreedsUseCase: SearchBreedsUseCase;

  beforeEach(() => {
    breedRepository = {
      findAll: vi.fn(),
      findById: vi.fn(),
      search: vi.fn()
    };
    searchBreedsUseCase = new SearchBreedsUseCase(breedRepository);
  });

  it('should return breeds matching search query', async () => {
    const mockBreeds: Breed[] = [
      {
        id: 'abys',
        name: 'Abyssinian',
        description: 'Active and energetic',
        temperament: 'Active, Energetic',
        origin: 'Egypt',
        life_span: '14 - 15',
        weight: { imperial: '7 - 10', metric: '3 - 5' }
      }
    ];

    vi.spyOn(breedRepository, 'search').mockResolvedValue(mockBreeds);

    const result = await searchBreedsUseCase.execute('aby');

    expect(result).toEqual(mockBreeds);
    expect(breedRepository.search).toHaveBeenCalledWith('aby');
  });

  it('should return empty array when no breeds match', async () => {
    vi.spyOn(breedRepository, 'search').mockResolvedValue([]);

    const result = await searchBreedsUseCase.execute('nonexistent');

    expect(result).toEqual([]);
  });

  it('should throw error when query is empty', async () => {
    await expect(searchBreedsUseCase.execute('')).rejects.toThrow('Search query is required');
  });

  it('should throw error when query is whitespace', async () => {
    await expect(searchBreedsUseCase.execute('   ')).rejects.toThrow('Search query is required');
  });
});
