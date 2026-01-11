import axios, { AxiosInstance } from 'axios';
import { config } from '../../shared/config/environment';
import { Breed } from '../../domain/entities/Breed';
import { CatImage } from '../../domain/entities/CatImage';

export class CatApiService {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: config.catApi.url,
      headers: {
        'x-api-key': config.catApi.key
      },
      timeout: 10000
    });
  }

  async getAllBreeds(): Promise<Breed[]> {
    try {
      const response = await this.axiosInstance.get<Breed[]>('/breeds');
      return response.data;
    } catch (error) {
      console.error('Error fetching breeds from Cat API:', error);
      throw new Error('Failed to fetch breeds from external API');
    }
  }

  async getBreedById(breedId: string): Promise<Breed | null> {
    try {
      const response = await this.axiosInstance.get<Breed[]>('/breeds', {
        params: { breed_ids: breedId }
      });
      return response.data.length > 0 ? response.data[0] : null;
    } catch (error) {
      console.error('Error fetching breed by ID from Cat API:', error);
      throw new Error('Failed to fetch breed from external API');
    }
  }

  async searchBreeds(query: string): Promise<Breed[]> {
    try {
      const response = await this.axiosInstance.get<Breed[]>('/breeds/search', {
        params: { q: query }
      });
      return response.data;
    } catch (error) {
      console.error('Error searching breeds from Cat API:', error);
      throw new Error('Failed to search breeds from external API');
    }
  }

  async getImagesByBreedId(breedId: string, limit: number = 10): Promise<CatImage[]> {
    try {
      const response = await this.axiosInstance.get<CatImage[]>('/images/search', {
        params: {
          breed_ids: breedId,
          limit
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching images from Cat API:', error);
      throw new Error('Failed to fetch images from external API');
    }
  }
}
