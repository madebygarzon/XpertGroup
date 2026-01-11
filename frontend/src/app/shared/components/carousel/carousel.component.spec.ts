import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CarouselComponent } from './carousel.component';
import { CatImage } from '../../../core/models/cat-image.model';

describe('CarouselComponent', () => {
  let component: CarouselComponent;
  let fixture: ComponentFixture<CarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CarouselComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(CarouselComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should start at index 0', () => {
    expect(component.currentIndex).toBe(0);
  });

  it('should navigate to next image', () => {
    const mockImages: CatImage[] = [
      { id: '1', url: 'url1', width: 100, height: 100 },
      { id: '2', url: 'url2', width: 100, height: 100 }
    ];
    component.images = mockImages;
    component.nextImage();
    expect(component.currentIndex).toBe(1);
  });

  it('should navigate to previous image', () => {
    const mockImages: CatImage[] = [
      { id: '1', url: 'url1', width: 100, height: 100 },
      { id: '2', url: 'url2', width: 100, height: 100 }
    ];
    component.images = mockImages;
    component.currentIndex = 1;
    component.previousImage();
    expect(component.currentIndex).toBe(0);
  });

  it('should wrap around to last image when going previous from first', () => {
    const mockImages: CatImage[] = [
      { id: '1', url: 'url1', width: 100, height: 100 },
      { id: '2', url: 'url2', width: 100, height: 100 }
    ];
    component.images = mockImages;
    component.currentIndex = 0;
    component.previousImage();
    expect(component.currentIndex).toBe(1);
  });
});
