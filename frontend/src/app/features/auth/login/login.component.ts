import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthHttpService } from '@core/services/auth-http.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  loading: boolean = false;
  error: string | null = null;

  constructor(
    private authService: AuthHttpService,
    private router: Router
  ) {}

  onSubmit(): void {
    this.error = null;

    if (!this.email || !this.password) {
      this.error = 'Please fill in all fields';
      return;
    }

    this.loading = true;

    this.authService.login({ email: this.email, password: this.password }).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/profile']);
      },
      error: (err) => {
        this.loading = false;
        this.error = err.error?.message || 'Invalid email or password';
        console.error('Login error:', err);
      }
    });
  }
}
