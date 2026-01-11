import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Breed } from '../models/breed.model';

@Injectable({
  providedIn: 'root'
})
export abstract class BreedRepository {
  abstract getAll(): Observable<Breed[]>;
  abstract getById(id: string): Observable<Breed>;
  abstract search(query: string): Observable<Breed[]>;
}
