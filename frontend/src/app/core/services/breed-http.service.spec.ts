import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { BreedHttpService } from './breed-http.service';

describe('BreedHttpService', () => {
  let service: BreedHttpService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BreedHttpService]
    });
    service = TestBed.inject(BreedHttpService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch all breeds', () => {
    const mockBreeds = [
      { id: 'abys', name: 'Abyssinian', description: 'Test', temperament: 'Active', origin: 'Egypt', life_span: '14-15', weight: { imperial: '7-10', metric: '3-5' } }
    ];

    service.getAll().subscribe(breeds => {
      expect(breeds.length).toBe(1);
      expect(breeds[0].name).toBe('Abyssinian');
    });

    const req = httpMock.expectOne('http://localhost:3000/api/breeds');
    expect(req.request.method).toBe('GET');
    req.flush({ status: 'success', data: mockBreeds });
  });
});
