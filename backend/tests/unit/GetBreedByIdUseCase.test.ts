import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GetBreedByIdUseCase } from '../../src/application/use-cases/GetBreedByIdUseCase';
import { IBreedRepository } from '../../src/domain/repositories/IBreedRepository';
import { Breed } from '../../src/domain/entities/Breed';

describe('GetBreedByIdUseCase', () => {
  let breedRepository: IBreedRepository;
  let getBreedByIdUseCase: GetBreedByIdUseCase;

  beforeEach(() => {
    breedRepository = {
      findAll: vi.fn(),
      findById: vi.fn(),
      search: vi.fn()
    };
    getBreedByIdUseCase = new GetBreedByIdUseCase(breedRepository);
  });

  it('should return breed when found', async () => {
    const mockBreed: Breed = {
      id: 'abys',
      name: 'Abyssinian',
      description: 'Active and energetic',
      temperament: 'Active, Energetic',
      origin: 'Egypt',
      life_span: '14 - 15',
      weight: { imperial: '7 - 10', metric: '3 - 5' }
    };

    vi.spyOn(breedRepository, 'findById').mockResolvedValue(mockBreed);

    const result = await getBreedByIdUseCase.execute('abys');

    expect(result).toEqual(mockBreed);
    expect(breedRepository.findById).toHaveBeenCalledWith('abys');
  });

  it('should return null when breed not found', async () => {
    vi.spyOn(breedRepository, 'findById').mockResolvedValue(null);

    const result = await getBreedByIdUseCase.execute('invalid');

    expect(result).toBeNull();
  });

  it('should throw error when breed_id is empty', async () => {
    await expect(getBreedByIdUseCase.execute('')).rejects.toThrow('Breed ID is required');
  });

  it('should throw error when breed_id is whitespace', async () => {
    await expect(getBreedByIdUseCase.execute('   ')).rejects.toThrow('Breed ID is required');
  });
});
