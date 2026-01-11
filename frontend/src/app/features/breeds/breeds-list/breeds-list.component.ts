import { Component, OnInit } from '@angular/core';
import { BreedRepository } from '@core/repositories/breed.repository';
import { ImageRepository } from '@core/repositories/image.repository';
import { Breed } from '@core/models/breed.model';
import { CatImage } from '@core/models/cat-image.model';

@Component({
  selector: 'app-breeds-list',
  templateUrl: './breeds-list.component.html',
  styleUrls: ['./breeds-list.component.scss']
})
export class BreedsListComponent implements OnInit {
  breeds: Breed[] = [];
  selectedBreed: Breed | null = null;
  breedImages: CatImage[] = [];
  loading: boolean = false;
  loadingImages: boolean = false;
  error: string | null = null;

  constructor(
    private breedRepository: BreedRepository,
    private imageRepository: ImageRepository
  ) {}

  ngOnInit(): void {
    this.loadBreeds();
  }

  loadBreeds(): void {
    this.loading = true;
    this.error = null;

    this.breedRepository.getAll().subscribe({
      next: (breeds) => {
        this.breeds = breeds;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load breeds. Please try again.';
        this.loading = false;
        console.error('Error loading breeds:', err);
      }
    });
  }

  onBreedSelected(event: Event): void {
    const select = event.target as HTMLSelectElement;
    const breedId = select.value;

    if (!breedId) {
      this.selectedBreed = null;
      this.breedImages = [];
      return;
    }

    const breed = this.breeds.find(b => b.id === breedId);
    if (breed) {
      this.selectedBreed = breed;
      this.loadBreedImages(breedId);
    }
  }

  loadBreedImages(breedId: string): void {
    this.loadingImages = true;
    this.breedImages = [];

    this.imageRepository.getImagesByBreedId(breedId, 5).subscribe({
      next: (images) => {
        this.breedImages = images;
        this.loadingImages = false;
      },
      error: (err) => {
        console.error('Error loading images:', err);
        this.loadingImages = false;
      }
    });
  }

  get displayBreeds(): Breed[] {
    return this.breeds;
  }

  getRatingStars(rating: number | undefined): string {
    if (!rating) return '';
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  }
}
