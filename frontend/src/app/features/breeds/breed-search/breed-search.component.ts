import { Component } from '@angular/core';
import { BreedRepository } from '@core/repositories/breed.repository';
import { Breed } from '@core/models/breed.model';

@Component({
  selector: 'app-breed-search',
  templateUrl: './breed-search.component.html',
  styleUrls: ['./breed-search.component.scss']
})
export class BreedSearchComponent {
  searchQuery: string = '';
  breeds: Breed[] = [];
  filteredBreeds: Breed[] = [];
  loading: boolean = false;
  error: string | null = null;
  searched: boolean = false;

  constructor(private breedRepository: BreedRepository) {
    this.loadAllBreeds();
  }

  loadAllBreeds(): void {
    this.loading = true;
    this.breedRepository.getAll().subscribe({
      next: (breeds) => {
        this.breeds = breeds;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load breeds';
        this.loading = false;
        console.error(err);
      }
    });
  }

  onSearch(): void {
    if (!this.searchQuery.trim()) {
      this.error = 'Please enter a search query';
      return;
    }

    this.loading = true;
    this.error = null;
    this.searched = true;

    this.breedRepository.search(this.searchQuery).subscribe({
      next: (breeds) => {
        this.filteredBreeds = breeds;
        this.loading = false;

        if (breeds.length === 0) {
          this.error = 'No breeds found matching your search';
        }
      },
      error: (err) => {
        this.error = 'Failed to search breeds. Please try again.';
        this.loading = false;
        console.error('Error searching breeds:', err);
      }
    });
  }

  clearSearch(): void {
    this.searchQuery = '';
    this.filteredBreeds = [];
    this.searched = false;
    this.error = null;
  }

  get displayBreeds(): Breed[] {
    return this.searched ? this.filteredBreeds : this.breeds;
  }
}
