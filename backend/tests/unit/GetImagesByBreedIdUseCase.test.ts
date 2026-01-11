import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GetImagesByBreedIdUseCase } from '../../src/application/use-cases/GetImagesByBreedIdUseCase';
import { ICatImageRepository } from '../../src/domain/repositories/ICatImageRepository';
import { CatImage } from '../../src/domain/entities/CatImage';

describe('GetImagesByBreedIdUseCase', () => {
  let catImageRepository: ICatImageRepository;
  let getImagesByBreedIdUseCase: GetImagesByBreedIdUseCase;

  beforeEach(() => {
    catImageRepository = {
      findByBreedId: vi.fn()
    };
    getImagesByBreedIdUseCase = new GetImagesByBreedIdUseCase(catImageRepository);
  });

  it('should return images for a breed', async () => {
    const mockImages: CatImage[] = [
      {
        id: 'img1',
        url: 'https://cdn2.thecatapi.com/images/img1.jpg',
        width: 1200,
        height: 800
      },
      {
        id: 'img2',
        url: 'https://cdn2.thecatapi.com/images/img2.jpg',
        width: 1000,
        height: 600
      }
    ];

    vi.spyOn(catImageRepository, 'findByBreedId').mockResolvedValue(mockImages);

    const result = await getImagesByBreedIdUseCase.execute('abys', 10);

    expect(result).toEqual(mockImages);
    expect(result).toHaveLength(2);
    expect(catImageRepository.findByBreedId).toHaveBeenCalledWith('abys', 10);
  });

  it('should use default limit of 10 when not provided', async () => {
    const mockImages: CatImage[] = [];

    vi.spyOn(catImageRepository, 'findByBreedId').mockResolvedValue(mockImages);

    await getImagesByBreedIdUseCase.execute('abys');

    expect(catImageRepository.findByBreedId).toHaveBeenCalledWith('abys', 10);
  });

  it('should throw error when breed_id is empty', async () => {
    await expect(getImagesByBreedIdUseCase.execute('', 10)).rejects.toThrow('Breed ID is required');
  });

  it('should throw error when limit is less than 1', async () => {
    await expect(getImagesByBreedIdUseCase.execute('abys', 0)).rejects.toThrow('Limit must be between 1 and 100');
  });

  it('should throw error when limit is greater than 100', async () => {
    await expect(getImagesByBreedIdUseCase.execute('abys', 101)).rejects.toThrow('Limit must be between 1 and 100');
  });
});
