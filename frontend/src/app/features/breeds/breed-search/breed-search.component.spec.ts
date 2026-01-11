import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { BreedSearchComponent } from './breed-search.component';
import { BreedRepository } from '../../../core/repositories/breed.repository';
import { of } from 'rxjs';

describe('BreedSearchComponent', () => {
  let component: BreedSearchComponent;
  let fixture: ComponentFixture<BreedSearchComponent>;
  let breedRepository: jasmine.SpyObj<BreedRepository>;

  beforeEach(async () => {
    const breedRepoSpy = jasmine.createSpyObj('BreedRepository', ['getAll', 'search']);

    await TestBed.configureTestingModule({
      declarations: [BreedSearchComponent],
      imports: [FormsModule],
      providers: [
        { provide: BreedRepository, useValue: breedRepoSpy }
      ]
    }).compileComponents();

    breedRepository = TestBed.inject(BreedRepository) as jasmine.SpyObj<BreedRepository>;
    breedRepository.getAll.and.returnValue(of([]));

    fixture = TestBed.createComponent(BreedSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should search breeds when query is provided', () => {
    component.searchQuery = 'persian';
    breedRepository.search.and.returnValue(of([]));

    component.onSearch();

    expect(breedRepository.search).toHaveBeenCalledWith('persian');
  });
});
