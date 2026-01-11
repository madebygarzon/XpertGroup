import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BreedsListComponent } from './breeds-list.component';
import { BreedRepository } from '../../../core/repositories/breed.repository';
import { ImageRepository } from '../../../core/repositories/image.repository';
import { of } from 'rxjs';

describe('BreedsListComponent', () => {
  let component: BreedsListComponent;
  let fixture: ComponentFixture<BreedsListComponent>;
  let breedRepository: jasmine.SpyObj<BreedRepository>;
  let imageRepository: jasmine.SpyObj<ImageRepository>;

  beforeEach(async () => {
    const breedRepoSpy = jasmine.createSpyObj('BreedRepository', ['getAll', 'getById', 'search']);
    const imageRepoSpy = jasmine.createSpyObj('ImageRepository', ['getImagesByBreedId']);

    await TestBed.configureTestingModule({
      declarations: [BreedsListComponent],
      providers: [
        { provide: BreedRepository, useValue: breedRepoSpy },
        { provide: ImageRepository, useValue: imageRepoSpy }
      ]
    }).compileComponents();

    breedRepository = TestBed.inject(BreedRepository) as jasmine.SpyObj<BreedRepository>;
    imageRepository = TestBed.inject(ImageRepository) as jasmine.SpyObj<ImageRepository>;

    breedRepository.getAll.and.returnValue(of([]));

    fixture = TestBed.createComponent(BreedsListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load breeds on init', () => {
    fixture.detectChanges();
    expect(breedRepository.getAll).toHaveBeenCalled();
  });
});
