import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { ImageRepository } from '../repositories/image.repository';
import { CatImage } from '../models/cat-image.model';
import { ApiResponse } from '../models/breed.model';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImageHttpService extends ImageRepository {
  private apiUrl = `${environment.apiUrl}/images`;

  constructor(private http: HttpClient) {
    super();
  }

  getImagesByBreedId(breedId: string, limit: number = 10): Observable<CatImage[]> {
    return this.http.get<ApiResponse<CatImage[]>>(`${this.apiUrl}/imagesbybreedid`, {
      params: { breed_id: breedId, limit: limit.toString() }
    }).pipe(
      map(response => response.data)
    );
  }
}
