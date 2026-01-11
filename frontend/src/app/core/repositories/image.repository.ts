import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CatImage } from '../models/cat-image.model';

@Injectable({
  providedIn: 'root'
})
export abstract class ImageRepository {
  abstract getImagesByBreedId(breedId: string, limit?: number): Observable<CatImage[]>;
}
