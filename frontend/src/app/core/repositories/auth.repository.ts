import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginRequest, RegisterRequest, User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export abstract class AuthRepository {
  abstract login(credentials: LoginRequest): Observable<{ user: User; token: string }>;
  abstract register(data: RegisterRequest): Observable<{ user: User; token: string }>;
  abstract getCurrentUser(): User | null;
  abstract getToken(): string | null;
  abstract isAuthenticated(): boolean;
  abstract logout(): void;
}
