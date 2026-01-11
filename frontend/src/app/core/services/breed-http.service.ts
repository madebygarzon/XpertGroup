import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { BreedRepository } from '../repositories/breed.repository';
import { Breed, ApiResponse } from '../models/breed.model';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BreedHttpService extends BreedRepository {
  private apiUrl = `${environment.apiUrl}/breeds`;

  constructor(private http: HttpClient) {
    super();
  }

  getAll(): Observable<Breed[]> {
    return this.http.get<ApiResponse<Breed[]>>(this.apiUrl).pipe(
      map(response => response.data)
    );
  }

  getById(id: string): Observable<Breed> {
    return this.http.get<ApiResponse<Breed>>(`${this.apiUrl}/${id}`).pipe(
      map(response => response.data)
    );
  }

  search(query: string): Observable<Breed[]> {
    return this.http.get<ApiResponse<Breed[]>>(`${this.apiUrl}/search`, {
      params: { q: query }
    }).pipe(
      map(response => response.data)
    );
  }
}
