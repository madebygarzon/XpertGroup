import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, tap } from 'rxjs';
import { AuthRepository } from '../repositories/auth.repository';
import { LoginRequest, RegisterRequest, User, AuthResponse } from '../models/user.model';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthHttpService extends AuthRepository {
  private apiUrl = `${environment.apiUrl}/users`;
  private readonly TOKEN_KEY = 'auth_token';
  private readonly USER_KEY = 'current_user';

  constructor(private http: HttpClient) {
    super();
  }

  login(credentials: LoginRequest): Observable<{ user: User; token: string }> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, credentials).pipe(
      map(response => ({
        user: {
          id: response.data.id,
          email: response.data.email,
          firstName: response.data.firstName,
          lastName: response.data.lastName
        },
        token: response.data.token
      })),
      tap(({ user, token }) => {
        this.saveToken(token);
        this.saveUser(user);
      })
    );
  }

  register(data: RegisterRequest): Observable<{ user: User; token: string }> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, data).pipe(
      map(response => ({
        user: {
          id: response.data.id,
          email: response.data.email,
          firstName: response.data.firstName,
          lastName: response.data.lastName
        },
        token: response.data.token
      })),
      tap(({ user, token }) => {
        this.saveToken(token);
        this.saveUser(user);
      })
    );
  }

  getCurrentUser(): User | null {
    const userJson = localStorage.getItem(this.USER_KEY);
    return userJson ? JSON.parse(userJson) : null;
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
  }

  private saveToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  private saveUser(user: User): void {
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }
}
