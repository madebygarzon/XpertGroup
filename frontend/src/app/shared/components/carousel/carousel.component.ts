import { Component, Input } from '@angular/core';
import { CatImage } from '@core/models/cat-image.model';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent {
  @Input() images: CatImage[] = [];
  currentIndex: number = 0;

  get currentImage(): CatImage | null {
    return this.images.length > 0 ? this.images[this.currentIndex] : null;
  }

  get hasImages(): boolean {
    return this.images.length > 0;
  }

  nextImage(): void {
    if (this.images.length > 0) {
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
    }
  }

  previousImage(): void {
    if (this.images.length > 0) {
      this.currentIndex = this.currentIndex === 0
        ? this.images.length - 1
        : this.currentIndex - 1;
    }
  }

  goToImage(index: number): void {
    this.currentIndex = index;
  }
}
